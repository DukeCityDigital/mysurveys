import { Participant } from "./participant.model";

Participant;

describe("Participant.Model", () => {
  it("should create an instance", () => {
    expect(new Participant()).toBeTruthy();
  });
});
