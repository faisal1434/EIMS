import { RoomType } from '../common/constants-model';

export class Room {
  constructor(
    public roomId?: number,
    public roomType?: RoomType,
    public roomNo?: string,
    public capacity?: number
  ) { }
}
