const ts = require('typescript'), fs = require('fs')
const [file, compName, ...ranges] = process.argv.slice(2)
const text = fs.readFileSync(file, 'utf8')
const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
const line = (n) => sf.getLineAndCharacterOfPosition(n).line + 1
let comp; sf.forEachChild(function v(n) { if (ts.isVariableDeclaration(n) && n.name.getText() === compName) comp = n; ts.forEachChild(n, v) })
const fn = comp.initializer
// names declared at the component's top level (params + statements)
const scope = new Map()
const bind = (name, kind) => { if (ts.isIdentifier(name)) scope.set(name.text, kind); else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) name.elements.forEach((e) => !ts.isOmittedExpression(e) && bind(e.name, kind)) }
fn.parameters.forEach((p) => bind(p.name, 'prop'))
fn.body.statements.forEach((s) => { if (ts.isVariableStatement(s)) s.declarationList.declarations.forEach((d) => bind(d.name, 'local')); else if (ts.isFunctionDeclaration(s) && s.name) scope.set(s.name.text, 'function') })
// module-level names (not props): imports, top consts
const modNames = new Set()
sf.statements.forEach((s) => { if (ts.isImportDeclaration(s)) { const c = s.importClause; if (c?.name) modNames.add(c.name.text); c?.namedBindings && (ts.isNamedImports(c.namedBindings) ? c.namedBindings.elements.forEach((e) => modNames.add(e.name.text)) : modNames.add(c.namedBindings.name.text)) } else if (ts.isVariableStatement(s)) s.declarationList.declarations.forEach((d) => ts.isIdentifier(d.name) && modNames.add(d.name.text)) })
for (const r of ranges) {
  const [a, b] = r.split('-').map(Number)
  const used = new Set(), mod = new Set()
  sf.forEachChild(function v(n) {
    const sl = line(n.getStart()), el = line(n.getEnd())
    if (el < a || sl > b) return
    if (ts.isIdentifier(n) && sl >= a && el <= b) {
      const p = n.parent
      const isPropName = (ts.isPropertyAccessExpression(p) && p.name === n) || (ts.isPropertyAssignment(p) && p.name === n) || ts.isJsxAttribute(p) && p.name === n || (ts.isJsxOpeningElement(p) || ts.isJsxClosingElement(p) || ts.isJsxSelfClosingElement(p)) && p.tagName === n
      if (!isPropName) { if (scope.has(n.text)) used.add(n.text); else if (modNames.has(n.text)) mod.add(n.text) }
    }
    ts.forEachChild(n, v)
  })
  console.log(`L${r}: props needed = [${[...used].map((u) => u + ':' + scope.get(u)).join(', ')}]`)
  console.log(`        module names used = [${[...mod].join(', ')}]`)
}
console.log('\nscope:', [...scope].map(([k, v]) => k + ':' + v).join(' | '))
