build:
	sudo docker build -t linguistic-service .

run: build
	sudo docker run -d --network=host linguistic-service