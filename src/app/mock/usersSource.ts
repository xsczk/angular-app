import {DataSource} from '../select';

export class UsersSource implements DataSource<string[]> {
  async load() {
    return new Promise((resolve: (val: string[]) => void) =>
      setTimeout(() => resolve([
        'Doraemon', 'Nobita', 'Shizuka', 'Suneo', 'Jaian'
      ]), 500))
  }
}
