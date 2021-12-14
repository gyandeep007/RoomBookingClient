export class Room{
  id:number;
  name:string;
  location:string;
  capacities =new Array<LayoutCapacity>();

  static fromHttp(room : Room) : Room{
    const newRoom = new Room();
    newRoom.id = room.id;
    newRoom.name = room.name;
    newRoom.location = room.location;
    newRoom.capacities = new Array<LayoutCapacity>();
    for (const capacity of room.capacities){
       newRoom.capacities.push(LayoutCapacity.fromHttp(capacity));
    }
    return newRoom;
  }
}

export class LayoutCapacity{
    layout:Layout;
    capacity:number;


    static fromHttp(layoutCapacity : LayoutCapacity) : LayoutCapacity{
      const newLayoutCapacity = new LayoutCapacity();
      newLayoutCapacity.capacity = layoutCapacity.capacity;
      newLayoutCapacity.layout = Layout[layoutCapacity.layout];

      return newLayoutCapacity;
    }
}

export enum Layout{
  THEATER='Theater',
  USHAPE='U-Shape',
  BOARD='Board Meeting'
}
