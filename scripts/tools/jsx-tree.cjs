// Prints the JSX tree (tag, line span, size) of a React component so page sections can be located.
//   node scripts/tools/jsx-tree.cjs <file> <ComponentName> [depth]
const ts = require('typescript'), fs = require('fs')
const file = process.argv[2]
const text = fs.readFileSync(file, 'utf8')
const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
const line = (n) => sf.getLineAndCharacterOfPosition(n).line + 1
const tag = (n) => (ts.isJsxElement(n) ? n.openingElement.tagName.getText() : ts.isJsxSelfClosingElement(n) ? n.tagName.getText() : n.kind === ts.SyntaxKind.JsxFragment ? '<>' : null)
let comp
sf.forEachChild(function visit(n) { if (ts.isVariableDeclaration(n) && n.name.getText() === process.argv[3]) comp = n; ts.forEachChild(n, visit) })
const fn = comp.initializer
let ret
ts.forEachChild(fn.body, (s) => { if (ts.isReturnStatement(s)) ret = s })
let node = ret.expression; while (ts.isParenthesizedExpression(node)) node = node.expression
function show(n, depth, max) {
  const kids = (ts.isJsxElement(n) || n.kind === ts.SyntaxKind.JsxFragment ? n.children : []).filter((c) => ts.isJsxElement(c) || ts.isJsxSelfClosingElement(c) || ts.isJsxExpression(c) && c.expression)
  console.log(' '.repeat(depth * 2) + `${tag(n)}  L${line(n.getStart())}-${line(n.getEnd())} (${line(n.getEnd()) - line(n.getStart()) + 1} lines, ${kids.length} child nodes)`)
  if (depth < max) kids.forEach((k) => { if (tag(k)) show(k, depth + 1, max); else console.log(' '.repeat(depth * 2 + 2) + `{expr} L${line(k.getStart())}-${line(k.getEnd())}`) })
}
show(node, 0, +process.argv[4] || 2)
