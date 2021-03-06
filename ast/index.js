class Program {
  constructor(statements) {
    Object.assign(this, { statements });
  }
}

class Block {
  constructor(statements) {
    Object.assign(this, { statements });
  }
}

class Assignment {
  constructor(id, exp, firstAssignment = true) {
    Object.assign(this, { id, exp, firstAssignment });
  }
}

class Return {
  constructor(exp) {
    Object.assign(this, { exp });
  }
}

class FuncDecl {
  constructor(id, params, block) {
    //For built in functions, since their names are keywords
    if (id.constructor !== Id) {
      id = new Id(id);
    }
    Object.assign(this, { id, params, block });
  }
}

class FuncCall {
  constructor(id, params) {
    //For built in functions, since their names are keywords
    if (id.constructor !== Id) {
      id = new Id(id);
    }
    Object.assign(this, { id, params });
  }
}

class FuncCallStmt {
  constructor(func) {
    Object.assign(this, { func });
  }
}

class WhileLoop {
  constructor(condition, block) {
    Object.assign(this, { condition, block });
  }
}

class ForLoop {
  constructor(id, start, end, block) {
    Object.assign(this, { id, start, end, block });
  }
}

class Break {
  constructor() {}
}

class Continue {
  constructor() {}
}

class Conditional {
  constructor(condition, block, elseIfBlocks, elseBlock) {
    Object.assign(this, {
      condition,
      block,
      elseIfBlocks,
      elseBlock,
    });
  }
}

class ElseIfBlock {
  constructor(condition, block) {
    Object.assign(this, { condition, block });
  }
}

class ElseBlock {
  constructor(block) {
    Object.assign(this, { block });
  }
}

class Print {
  constructor(exp) {
    Object.assign(this, { exp });
  }
}

class List {
  constructor(items) {
    Object.assign(this, { items });
  }
}

class Dict {
  constructor(pairs) {
    Object.assign(this, { pairs });
  }
}

class KeyValue {
  constructor(key, value) {
    Object.assign(this, { key, value });
  }
}

class Key {
  constructor(name) {
    Object.assign(this, { name });
  }
}

class BinaryExp {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }
}

class NegationExp {
  constructor(exp) {
    Object.assign(this, { exp });
  }
}

class NotExp {
  constructor(exp) {
    Object.assign(this, { exp });
  }
}

class IntLit {
  constructor(value) {
    this.value = +value;
  }
}

class FloatLit {
  constructor(value) {
    this.value = +value;
  }
}

class BoolLit {
  constructor(value) {
    this.value = value;
  }
}

class Undefined {
  constructor() {}
}

class Text {
  constructor(quasi, placeholders = []) {
    Object.assign(this, { quasi, placeholders });
  }
}

class Placeholder {
  constructor(exp, index = null) {
    Object.assign(this, { exp, index });
  }
}

class Id {
  constructor(name, referenced = false) {
    Object.assign(this, { name, referenced });
  }
}

module.exports = {
  Program,
  Block,
  Assignment,
  Return,
  FuncDecl,
  FuncCall,
  FuncCallStmt,
  WhileLoop,
  ForLoop,
  Break,
  Continue,
  Conditional,
  ElseBlock,
  ElseIfBlock,
  Print,
  List,
  Dict,
  KeyValue,
  Key,
  BinaryExp,
  NegationExp,
  NotExp,
  IntLit,
  FloatLit,
  BoolLit,
  Undefined,
  Text,
  Placeholder,
  Id,
};
