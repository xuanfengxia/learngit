var express = require('express'),
app = express(),
server = require('http').createServer(app);
server.listen(9501);
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({server: server});

// 存储socket的数组，这里只能有2个socket，每次测试需要重启，否则会出错
var wsc = new Array();

//有socket连入
wss.on('connection', function(ws) {
    console.log('connection');
    console.log('hello world');

    // 将socket存入数组
    wsc.push(ws);
    console.log(wsc.length);
    // 转发收到的消息
    ws.on('message', function(message) {
//        var json = JSON.parse(message);
//        console.log('received (' + desc + '): ', json);

    	for(var i=0;i<wsc.length;i++){
    		wsc[i].send(message, function (error) {
                if (error) {
                    console.log('Send message error : ', error);
                }
            });
        }
    });
});