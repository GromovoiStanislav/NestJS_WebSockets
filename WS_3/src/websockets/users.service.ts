import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  users = [];
  constructor() {
    this.users = [];
  }
  add(id, name, room) {
    this.users.push({ id, name, room });
  }
  get(id) {
    return this.users.find((user) => user.id === id);
  }
  remove(id) {
    const user = this.get(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getByRoom(room) {
    return this.users.filter((user) => user.room === room);
  }
}


