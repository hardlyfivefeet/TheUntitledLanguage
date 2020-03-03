/*
 * Parser Tests
 *
 * These tests check that the parser produces the AST that we expect.
 *
 * Note we are only checking syntactic forms here, so our test programs
 * may have semantic errors.
 */

const parse = require("../parser");

/*
still need coverage for: 
- forloop
- funccall
- list
- dict
- not exp
*/

const {
  Block,
  Assignment,
  Return,
  FuncDecl,
  WhileLoop,
  ForLoop,
  Conditional,
  ElseIfBlock,
  ElseBlock,
  FuncCall,
  Print,
  List,
  Dict,
  BinaryExp,
  NegationExp,
  ParensExp,
  NotExp,
  Text,
  IntLit,
  FloatLit
} = require("../../ast");

const fixture = {
  hello: [
    String.raw`SP3AK["Hello, world"];`,
    [new Print(new Text("Hello, world"))]
  ],
  conditional: [
    String.raw`PR3SUM1NG[x < 5] < >`,
    [
      new Conditional(
        new BinaryExp("<", "x", new IntLit(5)),
        new Block([]),
        [],
        null
      )
    ]
  ],
  conditionalWithContent: [
    String.raw`PR3SUM1NG[x < 5] < x = 62; >`,
    [
      new Conditional(
        new BinaryExp("<", "x", new IntLit(5)),
        new Block([new Assignment("x", new IntLit("62"))]),
        [],
        null
      )
    ]
  ],
  conditionalWithElseIf: [
    String.raw`PR3SUM1NG[x < 5] < x = 62; > 3LS3 1F[x < 20] < x = 96; >`,
    [
      new Conditional(
        new BinaryExp("<", "x", new IntLit(5)),
        new Block([new Assignment("x", new IntLit("62"))]),
        [
          new ElseIfBlock(
            new BinaryExp("<", "x", new IntLit("20")),
            new Block([new Assignment("x", new IntLit("96"))])
          )
        ],
        null
      )
    ]
  ],
  conditionalWithElseIfAndElse: [
    String.raw`PR3SUM1NG[x < 5] < x = 62; > 3LS3 1F[x < 20] < x = 96; > 3LS3 < x = 100; >`,
    [
      new Conditional(
        new BinaryExp("<", "x", new IntLit(5)),
        new Block([new Assignment("x", new IntLit("62"))]),
        [
          new ElseIfBlock(
            new BinaryExp("<", "x", new IntLit("20")),
            new Block([new Assignment("x", new IntLit("96"))])
          )
        ],
        new ElseBlock(new Block([new Assignment("x", new IntLit("100"))]))
      )
    ]
  ],
  while: [
    String.raw`WH1L3[y > 20] < >`,
    [new WhileLoop(new BinaryExp(">", "y", new IntLit(20)), new Block([]))]
  ],
  whileWithContent: [
    String.raw`WH1L3[y > 20] < y = y - 1; >`,
    [
      new WhileLoop(
        new BinaryExp(">", "y", new IntLit(20)),
        new Block([new Assignment("y", new BinaryExp("-", "y", new IntLit(1)))])
      )
    ]
  ],
  mathExp: [
    String.raw`z = (-16.4 * 32) ** 8;`,
    [
      new Assignment(
        "z",
        new BinaryExp(
          "**",
          new IntLit("8"),
          new ParensExp(
            new BinaryExp(
              "*",
              new NegationExp(new FloatLit("16.4")),
              new IntLit("32")
            )
          )
        )
      )
    ]
  ],
  funcDecl: [
    String.raw`PR0GRAM add_five[value] < G1V3 value + 5; >`,
    [
      new FuncDecl(
        "add_five",
        //TODO:
        //No clue why I need it to be an array inside an array below here if someone wants to
        //figure that out and explain it to me! Something to do with "NonemptyListOf" in parser
        [["value"]],
        new Block([new Return(new BinaryExp("+", "value", new IntLit("5")))])
      )
    ]
  ]
};

describe("The parser", () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct AST for ${name}`, done => {
      expect(parse(source)).toEqual(expected);
      done();
    });
  });

  test("throws an exception on a syntax error", done => {
    expect(() => parse("as$df^&%*$&")).toThrow();
    done();
  });
});
