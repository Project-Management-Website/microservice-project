const foo = (io: any, socket: any) => {
    let cons = 1
    socket.on("foo", () => {
        cons = 2

    socket.emit("barr", {
        cons
    })
    })

}

export = foo