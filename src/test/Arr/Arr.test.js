import {Lst} from "../../Lst/factory.js";
import {Kvm} from "../../Kvm/factory.js";
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