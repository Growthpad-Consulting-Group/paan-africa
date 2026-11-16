// Moves JSX blocks of a page component into their own component files (verbatim), wiring props + imports.
const ts = require('typescript'), fs = require('fs'), path = require('path')
const [file, compName, specFile] = process.argv.slice(2)
const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'))   // { outDir, blocks: [{ start, end, name, types: {prop: "TS type"} }] }
const text = fs.readFileSync(file, 'utf8')
const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
const line = (n) => sf.getLineAndCharacterOfPosition(n).line + 1
let comp; sf.forEachChild(function v(n) { if (ts.isVariableDeclaration(n) && n.name.getText() === compName) comp = n; ts.forEachChild(n, v) })
const fn = comp.initializer
const scope = new Map()
const bind = (name, kind) => { if (ts.isIdentifier(name)) scope.set(name.text, kind); else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) name.elements.forEach((e) => !ts.isOmittedExpression(e) && bind(e.name, kind)) }
fn.parameters.forEach((p) => bind(p.name, 'prop'))
fn.body.statements.forEach((s) => { if (ts.isVariableStatement(s)) s.declarationList.declarations.forEach((d) => bind(d.name, 'local')); else if (ts.isFunctionDeclaration(s) && s.name) scope.set(s.name.text, 'function') })
// import map: identifier -> {spec, kind}; module-level consts
const imports = new Map(), modConsts = new Map()
sf.statements.forEach((s) => {
  if (ts.isImportDeclaration(s)) {
    const src = s.moduleSpecifier.text, c = s.importClause
    if (c?.name) imports.set(c.name.text, { src, kind: 'default', name: c.name.text })
    if (c?.namedBindings) { if (ts.isNamedImports(c.namedBindings)) c.namedBindings.elements.forEach((e) => imports.set(e.name.text, { src, kind: 'named', name: e.name.text, orig: e.propertyName?.text })); else imports.set(c.namedBindings.name.text, { src, kind: 'ns', name: c.namedBindings.name.text }) }
  } else if (ts.isVariableStatement(s)) s.declarationList.declarations.forEach((d) => ts.isIdentifier(d.name) && modConsts.set(d.name.text, s.getText()))
})
const fromDir = path.dirname(path.resolve(file)), toDir = path.resolve(spec.outDir)
const rel = (src) => {
  if (!src.startsWith('.')) return src
  const abs = path.resolve(fromDir, src)
  const srcRoot = path.resolve('src')
  if (abs.startsWith(srcRoot)) return '@/' + path.relative(srcRoot, abs).replace(/\\/g, '/')
  let r = path.relative(toDir, abs).replace(/\\/g, '/'); return r.startsWith('.') ? r : './' + r
}
const reportAll = []
const edits = []
for (const b of spec.blocks) {
  // find the JSX node that starts at line b.start and ends at b.end
  let target
  sf.forEachChild(function v(n) { if ((ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) && line(n.getStart()) === b.start && line(n.getEnd()) === b.end && !target) target = n; ts.forEachChild(n, v) })
  if (!target) { console.error('NO NODE for', b.name, b.start, b.end); process.exit(1) }
  const used = new Set(), mods = new Set(), consts = new Set()
  ;(function v(n) {
    if (ts.isIdentifier(n)) {
      const p = n.parent
      const isName = (ts.isPropertyAccessExpression(p) && p.name === n) || (ts.isPropertyAssignment(p) && p.name === n) || (ts.isJsxAttribute(p) && p.name === n)
      if (!isName) { if (scope.has(n.text)) used.add(n.text); else if (imports.has(n.text)) mods.add(n.text); else if (modConsts.has(n.text)) consts.add(n.text) }
    }
    ts.forEachChild(n, v)
  })(target)
  used.delete('isFixed')
  let body = text.slice(target.getStart(), target.getEnd())
  body = body.replace(/\s+isFixed=\{isFixed\}/g, '')
  // dedent
  const lines = body.split('\n'); const ind = Math.min(...lines.slice(1).filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length), 99)
  body = lines.map((l, i) => (i === 0 ? l : l.slice(Math.min(ind, l.match(/^ */)[0].length)))).join('\n')
  const props = [...used]
  const importLines = new Map()
  for (const m of mods) { const i = imports.get(m); const key = rel(i.src); const e = importLines.get(key) || { def: null, named: [], ns: null }; if (i.kind === 'default') e.def = m; else if (i.kind === 'ns') e.ns = m; else e.named.push(i.orig ? `${i.orig} as ${m}` : m); importLines.set(key, e) }
  if (consts.size) importLines.set('@/components/summit/motion', { def: null, named: [...consts], ns: null })
  const imp = [...importLines].map(([k, e]) => `import ${[e.def, e.ns && `* as ${e.ns}`, e.named.length && `{ ${e.named.join(', ')} }`].filter(Boolean).join(', ')} from ${JSON.stringify(k)};`).join('\n')
  const typeLines = props.map((p) => `  ${p}${b.optional?.includes(p) ? '?' : ''}: ${b.types?.[p] ?? 'any'};`).join('\n')
  const out = `${imp}\n\n${props.length ? `type Props = {\n${typeLines}\n};\n\n` : ''}export default function ${b.name}(${props.length ? `{ ${props.join(', ')} }: Props` : ''}) {\n  return (\n${body.split('\n').map((l) => '    ' + l).join('\n')}\n  );\n}\n`
  fs.writeFileSync(path.join(spec.outDir, b.name + '.tsx'), out)
  edits.push({ start: target.getStart(), end: target.getEnd(), repl: `<${b.name}${props.map((p) => ` ${p}={${p}}`).join('')} />`, name: b.name })
  reportAll.push(`${b.name}: props [${props.join(', ')}] imports [${[...mods, ...consts].join(', ')}] (${b.end - b.start + 1} lines)`)
}
let out = text
for (const e of edits.sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.repl + out.slice(e.end)
// add imports for the new components after the last import
const names = edits.map((e) => e.name)
const lastImp = [...out.matchAll(/^import [^\n]*\n/gm)].pop(); const pos = lastImp.index + lastImp[0].length
out = out.slice(0, pos) + names.map((n) => `import ${n} from "@/components/summit/${n}";`).join('\n') + '\n' + out.slice(pos)
fs.writeFileSync(file, out)
console.log(reportAll.join('\n'))
