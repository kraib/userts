import { suite, test } from "mocha-typescript";
import { IUser } from "../interfaces/user";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";
import mongoose = require("mongoose");

@suite
class UserTest {
  private data: IUser;
  public static User: mongoose.Model<IUserModel>;

  public static before() {
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/sample";
    let connection: mongoose.Connection = mongoose.createConnection(
      MONGODB_CONNECTION
    );
    UserTest.User = connection.model<IUserModel>("User", userSchema);
    let chai = require("chai");
    chai.should();
  }

  constructor() {
    this.data = {
      email: "foo@bar.com",
      firstName: "Kraiba",
      lastName: "Semakula"
    };
  }

  @test("should create a new User")
  public create() {
    return new UserTest.User(this.data).save().then(result => {
      result._id.should.exist;
      result.email.should.equal(this.data.email);
      result.firstName.should.equal(this.data.firstName);
      result.lastName.should.equal(this.data.lastName);
    });
  }
}
