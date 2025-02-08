import { Writer } from "../../Writer/factory.js";
import { Either } from "../../Either/factory.js";

describe("Writer Monad", () => {
  
  test("unit should create a Writer with an empty log", () => {
      let writer = Writer(10).extract();
      expect(writer.value).toBe(10);
      expect(writer.log).toEqual([]);

      writer = Writer(10).fork(() => {}, x => x);
      expect(writer.value).toBe(10);
      expect(writer.log).toEqual([]);
  });

  test("map should transform the value without modifying the log", () => {
    const writer = Writer(5, ["Start"]);
    const newWriter = writer.map(x => x * 2);
    
    expect(newWriter.extract().value).toBe(10);
    expect(newWriter.extract().log).toEqual(["Start"]); 
  });

  test("bind should apply the function and merge logs", () => {
    const writer = Writer(5, ["Start"]);
    const newWriter = writer.bind(x => Writer(x + 3, ["Added 3"]));

    expect(newWriter.value).toBe(8);
    expect(newWriter.log).toEqual(["Start", "Added 3"]);
  });

  test("tell should add a log entry without changing the value", () => {
    const writer = Writer(7, ["Initial"]);
    const newWriter = writer.tell("Updated log");

    expect(newWriter.value).toBe(7);
    expect(newWriter.log).toEqual(["Initial", "Updated log"]);
  });

  test("extract should return an object with value and log", () => {
    const writer = Writer(42, ["Log message"]);
    const result = writer.extract();

    expect(result).toEqual({ value: 42, log: ["Log message"] });
  });

  test("fork should execute the function with extracted value and log", () => {
    const writer = Writer(10, ["First log"]);
    const mockFunction = jest.fn();
    
    writer.fork(null, mockFunction);

    expect(mockFunction).toHaveBeenCalledWith({ value: 10, log: ["First log"] });
  });

  test("test extend", () => {
    const writer = Writer(10, ["First log"]);
    const e = writer.extend(x => Either(x.extract()));
    expect(e.type()).toBe('Right');
  });

});