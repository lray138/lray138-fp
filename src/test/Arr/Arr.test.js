import {Lst} from "../../Lst/factory.js";
import {Kvm, attrsReducer} from "../../Kvm/factory.js";
import {Just} from "../../Maybe/factory.js";

test("'Lst' factory works.", () => {
  expect(Lst(['test']).type()).toBe('Lst');
  expect(Lst(['test']).get()).toEqual(['test']);

});

test("'Lst' and 'Kvm' factories work.", () => {
  expect(Lst(['test']).type()).toBe('Lst');
  expect(Kvm({ test: 'value' }).type()).toBe('Kvm');
});

describe('Gonad interface is implemented', () => {
  
  test("'Lst.map' function works.", () => {
      expect(
        Lst(['test'])
          .map(x => x.toUpperCase())
          .get()
      ).toEqual(['TEST']);
  });

  test("'Kvm.map' function works on object", () => {
      expect(
        Kvm({
          first: "John",
          last: "Smith"
        })
          .map(x => x.toUpperCase())
          .get()
      ).toEqual({
        first: "JOHN",
        last: "SMITH"
      });
  });

  test("'Kvm.getKeys' returns list of keys.", () => {
      expect(
        Kvm({
          first: "John",
          last: "Smith"
        })
          .getKeys()
          .get()
      ).toEqual(["first", "last"]);
  });

  test("'Kvm.filterKeys' filters object by key predicate.", () => {
      expect(
        Kvm({
          first: "John",
          last: "Smith",
          age: 30
        })
          .filter((value, key) => key.startsWith("a"))
          .get()
      ).toEqual({
        age: 30
      });
  });

  test("'Kvm.reduce' supports reducer callback mode.", () => {
      expect(
        Kvm({
          a: 1,
          b: 2,
          c: 3
        })
          .reduce((acc, value) => acc + value, 0)
          .get()
      ).toBe(6);
  });

  test("'Kvm.reduce' without callback returns Nil.", () => {
      expect(
        Kvm({
          class: "card"
        })
          .reduce()
          .type()
      ).toBe("Nil");
  });

  test("'Kvm.reduce' with attrsReducer builds html attribute string.", () => {
      expect(
        Kvm({
          class: "card",
          id: "hero",
          hidden: false,
          disabled: true
        })
          .reduce(attrsReducer, '')
          .get()
      ).toBe('class="card" id="hero" disabled');
  });

  test("'Lst.filter' filters list by predicate.", () => {
      expect(
        Lst([1, 2, 3, 4])
          .filter((value) => value % 2 === 0)
          .get()
      ).toEqual([2, 4]);
  });

  test("'Lst.bind' function works.", () => {
    
    expect(
      Lst(['test'])
        .bind(x => Just(x.toUpperCase()))
        .get()
    ).toEqual(['TEST']);

  });

  test("'Lst.ap' function works.", () => {

    expect(
      Lst([x => x.toUpperCase()])
        .ap(Just('test'))
        .get()
    ).toEqual(['TEST']);

  });

  test("'Lst.fork' function works.", () => {
      expect(
        Lst('test')
          .fork(
            x => x,
            x => x
          )
      ).toEqual(['test']);

  });

  test("'Lst.extend' function works.", () => {

      expect(
        Lst(['test'])
          .extend(x => Just(x))
          .type()
      ).toBe("Just");

  });

  test("'type' function works.", () => {
    expect(
      Lst(['test'])
        .type()
    ).toBe("Lst");
  });

}); // 'Gonad interface is implemented'



test('call', () => {
  let a = Kvm({
    "prop": "a"
  }).prop("prop").get()

  expect(a).toBe("a");
});

test("'Kvm.prop' returns Nil when prop does not exist.", () => {
  let a = Kvm({
    prop: "a"
  }).prop("missing").type();

  expect(a).toBe("Nil");
});

test("'Kvm.prop' resolves path-style input.", () => {
  let a = Kvm({
    some: [
      { prop: { path: "zero" } },
      { prop: { path: "one" } },
      { prop: { path: "two" } }
    ]
  }).prop("some[2].prop.path").get();

  expect(a).toBe("two");
});

test("'Kvm.prop' returns wrapped Kvm for object values.", () => {
  let a = Kvm({
    col_1: {
      content: "hello"
    }
  }).prop("col_1").type();

  expect(a).toBe("Kvm");
});

test("'Kvm.path' resolves nested object paths.", () => {
  let a = Kvm({
    user: {
      profile: {
        name: "Ada"
      }
    }
  }).path("/user/profile/name").get();

  expect(a).toBe("Ada");
});

test("'Kvm.path' resolves array indexes in paths.", () => {
  let a = Kvm({
    users: [
      { name: "Ada" },
      { name: "Grace" }
    ]
  }).path("/users/1/name").get();

  expect(a).toBe("Grace");
});

test("'Kvm.path' resolves bracketed array indexes in paths.", () => {
  let a = Kvm({
    some: [
      { prop: { path: "zero" } },
      { prop: { path: "one" } },
      { prop: { path: "two" } }
    ]
  }).path("/some/[2]/prop/path").get();

  expect(a).toBe("two");
});

test("'Kvm.path' resolves inline xpath-like bracket syntax.", () => {
  let a = Kvm({
    some: [
      { prop: { path: "zero" } },
      { prop: { path: "one" } },
      { prop: { path: "two" } }
    ]
  }).path("/some[2]/prop/path").get();

  expect(a).toBe("two");
});

test("'Kvm.path' resolves dot syntax with bracket indexes.", () => {
  let a = Kvm({
    some: [
      { prop: { path: "zero" } },
      { prop: { path: "one" } },
      { prop: { path: "two" } }
    ]
  }).path("some[2].prop.path").get();

  expect(a).toBe("two");
});

test("'Kvm.path' returns Nil when path does not exist.", () => {
  let a = Kvm({
    user: {
      profile: {
        name: "Ada"
      }
    }
  }).path("/user/address/city")
    .fork(
      x => x,
      x => x
    );

  expect(a).toBe('');
});

test("'Kvm.tryPath' returns Ok with wrapped value.", () => {
  let a = Kvm({
    some: [
      { prop: { path: "zero" } },
      { prop: { path: "one" } },
      { prop: { path: "two" } }
    ]
  }).tryPath("/some[2]/prop/path")
    .fork(
      x => x,
      x => x.type()
    );

  expect(a).toBe("Str");
});

test("'Kvm.tryPath' returns Err when path does not exist.", () => {
  let a = Kvm({
    user: {
      profile: {
        name: "Ada"
      }
    }
  }).tryPath("/user/address/city")
    .fork(
      x => x,
      x => x
    );

  expect(a).toBe('path "/user/address/city" not found');
});

test("'Kvm.tryProp' aliases 'tryPath'.", () => {
  let a = Kvm({
    some: [
      { prop: { path: "zero" } },
      { prop: { path: "one" } },
      { prop: { path: "two" } }
    ]
  }).tryProp("some[2].prop.path")
    .fork(
      x => x,
      x => x.type()
    );

  expect(a).toBe("Str");
});