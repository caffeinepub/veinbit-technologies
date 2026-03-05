import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  var stats = {
    projectsCompleted = 10;
    clients = 5;
    technologiesUsed = 8;
    yearsOfExperience = 3;
  };

  module Contact {
    public func compare(contact1 : Contact, contact2 : Contact) : Order.Order {
      Int.compare(contact1.timestamp, contact2.timestamp);
    };
  };

  type Contact = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  let contacts = List.empty<Contact>();

  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    if (name == "" or email == "" or message == "") {
      Runtime.trap("All fields are required");
    };

    let contact : Contact = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contacts.add(contact);
  };

  public query ({ caller }) func getContacts() : async [Contact] {
    contacts.toArray().reverse().sort();
  };

  public query ({ caller }) func getStats() : async {
    projectsCompleted : Nat;
    clients : Nat;
    technologiesUsed : Nat;
    yearsOfExperience : Nat;
  } {
    stats;
  };

  public shared ({ caller }) func updateStats(projects : Nat, clients : Nat, technologies : Nat, years : Nat) : async () {
    stats := {
      projectsCompleted = projects;
      clients;
      technologiesUsed = technologies;
      yearsOfExperience = years;
    };
  };
};
