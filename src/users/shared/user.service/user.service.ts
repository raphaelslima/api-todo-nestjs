import { Injectable } from '@nestjs/common';
import { User } from '../user/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find().exec();
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async create(user: User) {
    const createdTask = new this.userModel(user);
    return await createdTask.save();
  }

  async update(id: string, user: User) {
    await this.userModel.updateOne({ _id: new ObjectId(id) }, user).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}
