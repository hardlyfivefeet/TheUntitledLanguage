//the parser itself
const fs = require("fs");
const ohm = require("ohm-js");
const {
  Block,
  Assignment,
  Return,
  FuncDecl,
  WhileLoop,
  ForLoop,
  Conditional,
  ElseBlock,
  ElseIfBlock,
  FuncCall,
  Print,
  List,
  Dict,
  text,
  BinaryExp,
  NegationExp,
  ParensExp,
  NotExp,
  SimpleStatement
} = require("../ast");

const grammar = ohm.grammar(fs.readFileSync(__dirname + "/../r0b0p.ohm"));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation("ast", {
  Block(_lp, statements, _rp) {
    return new Block(statements.ast());
  },
  Assignment(id, _eq, exp) {
    return new Assignment(id.ast(), exp.ast());
  },
  Return(_give, exp) {
    return new Return(exp.ast());
  },
  FuncDecl(_program, name, _lb, params, _rb, block) {
    return new FuncDecl(name.ast(), params.ast(), statements.ast());
  },
  WhileLoop(_while, _lb, condition, _rb, block) {
    return new WhileLoop(condition.ast(), block.ast());
  },
  ForLoop(_count, _lb, id, _colon, start, _arrow, end, _rb, block) {
    return new ForLoop(id.ast(), start.ast(), end.ast(), block.ast());
  },
  Conditional(_if, _lb, condition, _rb, block, elseIfBlock, elseBlock) {
    return new Conditional(
      condition.ast(),
      block.ast(),
      elseIfBlock.ast(),
      elseBlock.ast()
    );
  },
  ElseIfBlock(_elseIf, _lb, exp, _rb, block) {
    return new ElseIfBlock(exp.ast(), block.ast());
  },
  ElseBlock(_else, block) {
    return new ElseBlock(block.ast());
  },
  FuncCall(name, _lb, params, _rb) {
    console.log("FUNC CALL!!!!!!");
    return new FuncCall(name.ast(), params.ast());
  },
  Print(_speak, _lb, exp, _rb) {
    console.log("print!!!!!!");
    console.log("exp is ");
    console.log(exp);
    return new Print(exp.ast());
  },
  List(_lcb, items, _rcb) {
    return new List(items.ast());
  },
  Dict(_lcb, items, _rcb) {
    return new Dict(items.ast());
  },
  text(_lq, chars, _rq) {
    console.log("text!!!!!!");
    console.log(chars);
    return this.sourceString;
  },
  Exp_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp1_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp2_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp3_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp5_binary(left, op, right) {
    return new BinaryExp(op.ast(), right.ast(), left.ast());
  },
  Exp4_negation(_neg, operand) {
    return new NegationExp(operand.ast());
  },
  Exp7_parens(_lp, exp, _rp) {
    return new ParensExp(exp.ast());
  },
  Exp6_not(_not, exp) {
    return new NotExp(exp.ast());
  },
  Statement_simple(statement, _semicolon) {
    console.log("simple statement!!!");
    return new SimpleStatement(statement.ast());
  },
  id(_firstChar, _restChars) {
    return this.sourceString;
  },
  _terminal() {
    return this.sourceString;
  }
});
/* eslint-enable no-unused-vars */

module.exports = text => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
