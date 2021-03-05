let http = require('http')
let url = require('url')
let fs = require('fs')

http.createServer((req, res) => {
	let q = url.parse(req.url, true);
	let filename = `.${q.pathname}.html`

	if (q.pathname === "/") {
		fs.readFile("./index.html", (err, data) => {
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.write(data);
			return res.end();
		})
	} else {
		fs.readFile(filename, (err, data) => {  
			if (err) {
				fs.readFile("./404.html", (err, data) =>{
					res.writeHead(404, {'Content-Type': 'text/html'})
					res.write(data);
					return res.end()
				}); 
			} else {
				res.writeHead(200, {'Content-Type': 'text/html'})
				res.write(data);
				return res.end();
			}
		})
	}

}).listen(8080);
