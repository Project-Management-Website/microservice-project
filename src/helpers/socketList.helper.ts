interface IUserSocket {
    socketId: string;
    userUuid: string;
}

export type TUserList = IUserSocket[];

export function findSocketIdByUserUuid(userList: TUserList, userUuid: string): string {
    console.log(userList, userUuid)
    const user = userList.find((user) => user.userUuid === userUuid);
    return user ? user.socketId : "";
}