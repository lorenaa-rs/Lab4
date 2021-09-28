#!/bin/bash
sudo docker run -dit --rm --name server$1 -p 300$1:3000 --network clocks server