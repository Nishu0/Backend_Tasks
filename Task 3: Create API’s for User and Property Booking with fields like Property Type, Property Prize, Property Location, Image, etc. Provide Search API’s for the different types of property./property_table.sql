CREATE TABLE propertyDetails(
	pid SERIAL PRIMARY KEY,
	address VARCHAR(100) NOT NULL,
	city VARCHAR(50) NOT NULL,
	state VARCHAR(50) NOT NULL
	rent INT NOT NULL,
	area INT NOT NULL,
	type VARCHAR(30) NOT NULL,
	garage INT NOT NULL,
	bedrooms INT NOT NULL,
	nbhk INT NOT NULL,
	basement BOOLEAN NOT NULL,
	image VARCHAR(150) NOT NULL,
	zip INT NOT NULL,
	bathroom INT NOT NULL,
	user VARCHAR(100) NOT NULL  
)
pid,address,city,state,rent,area,type,garage,bedrooms,nbhk,basement,image,zip,bathroom,user