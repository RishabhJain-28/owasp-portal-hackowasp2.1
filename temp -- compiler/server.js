const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const cp = require("child_process");
const fs = require("fs");
// const fs = require("");
const https = require("https");

// abc();
// function abc() {
// 	console.log(JSON.stringify(`a\nb`));
// const code = JSON.stringify(
// 	`
// #include <iostream>

// using namespace std;

// int main()
// {
//     cout << "HELLOaasdsdaaaa22\n";
//     cout << "HELLOaasdsdaaaa222222";
//     return 0;
// }

// `
// );

const name = "name";
// 	fs.writeFile(`${name}.cpp`, code, err => err);

// 	setTimeout(() => {
// 		let child2 = cp.spawn(`./${name}.exe`);
// 	let child = cp.spawn("g++", [`-o${name}`, `./${name}.cpp`]);
// 		child2.stdout.on("data", data => {
// 			console.log(`child2 stdout:\n${data}`);
// 		});
// 	}, 1000);
// const child2 = cp.spawn(`${name}`);

// child2.stdout.on("data", data => {
// 	console.log(`child stdout:\n${data}`);
// });
// 	console.log(`child std err:\n${data}`);
// child.stderr.on("data", data => {
// });
// child2.stderr.on("data", data => {
// 	console.log(`child2 std err:\n${data}`);
// });
// child.on("exit", function (code, signal) {
// 	console.log("child process exited with " + `code ${code} and signal ${signal}`);
// });
// }
// const c= cp.spawn('./')
// const child = cp.spawn("python", ["./test.py"]);

// console.log(child.stdout);

// const name= "name3";

// 	let output = "";
// 	let data = "";

// // const a = code.replace(/[\n]/g, '\\n');
// // console.log(a);
// function zxc(){
// 	fs.writeFile(`${name}.cpp`,code, (err) => {
// 		if (err) {
// 			console.error(err)
// 		}
// 	})
// 	try{
// 		let  child = cp.spawn("g++", [`-o${name}`, `./${name}.cpp`]);
// 		child.stderr.on("data", data => {
// 			console.log(`child std err:\n${data}`);
// 			error =data;
// 			return;
// 		});
// 		child.on('exit', (code, signal)=> {
// 			console.log("child process exited with " + `code ${code} and signal ${signal}`);
// 			if(code!==0)return;

// 			try{
// 				child = cp.spawn(`./${name}`);
// 				child.stdout.on("data", data => {

// 					console.log(`child stdout:\n${data}`);
// 					output= data;
// 				});
// 				child.stderr.on("data", data => {
// 					console.log(`child std err:\n${data}`);
// 					error =data;
// 				});
// 				child.on("exit", (code, signal) => {
// 					console.log("child process exited with " + `code ${code} and signal ${signal}`);
// 					fs.unlink(`${name}.exe`,err=>err && console.log(err));

// 				});

// 			}catch (err){
// 				// console.log(err);
// 			}
// 			fs.unlink(`${name}.cpp`,err=>err && console.log(err));

// 		})

// 	}catch (err){
// 		console.log("err")
// 	}

// }

const request = require("request");
const CLIENT_SECRET = "7d2355d22edae6301e428b455ea9d8753aaafdf2";

// const data = {
//     client_secret: CLIENT_SECRET,
//     async: 0,
//     source: source,
//     lang: "PYTHON",
//     time_limit: 5,
//     memory_limit: 262144,
// }

// let code =`#include<iostream> using namespace std;int main(){cout <<"HELLO YP ${name}";return 0;}`;
// var requ =;
async function m() {
  const source = `#include<iostream> 
		using namespace std;
		int main(){
			int a;
			cin>>a;
			cout<<a<<endl;
			cout <<"HELLO YP ${name}";
			return 0;
		}
		`;
  // 		const source = `print('a')
  // print('a')
  // 		`
  const req = {
    url: "https://api.hackerearth.com/code/run/",
    method: "POST",
    form: {
      client_secret: CLIENT_SECRET,
      async: 0,
      source: source,
      lang: "CPP14",
      time_limit: 5,
      memory_limit: 262144,
      input: 100,
    },
  };
  const res = await request(req, (err, res, body) => {
    // console.log(err);
    // console.log(res);
    console.log(JSON.parse(body));
    // for (let key in JSON.parse(body)){
    // 	console.log(key, body[key])
    // }
  });
  // console.log(res.body);
}

app.listen(PORT, console.log(`listning on port: ${PORT}`));
m();
// zxc();
