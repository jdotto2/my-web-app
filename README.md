# Purpose of the web application: https://jdotto.dev
### I built this application as a platform to showcase my knowledge of the IoT stack layers.
 - ***Perception layer***: sensors & actuators (low level programming)
 - ***Network layer***: Wi-Fi, LoRa, Cellular (IoT protocols: MQTT, AMQP, LoRaWAN, etc.)
 - ***Processing layer***: cloud computing (AWS, Azure, GCP, or other)
 - ***Application layer***: end user apps (mobile apps, web apps) like: https://jdotto.dev
 
# How I built the web application

Hosting: server information
-
 - ***Operating System***: Ubuntu Server 22.04 LTS
 - ***Web Server***: Nginx
 - ***Domain***: Google Domains (before acquisition by Squarespace)
 - ***TLS certificate***: [Let's Encrypt](https://letsencrypt.org/)
 - ***Performance & Content Delivery***: [Cloudflare](https://www.cloudflare.com/)


**Self-hosted, and why?**
 - ***Free***
 - ***Fully customizable***
 - ***Cloud providers' free tiers are short-term and offer limited flexibility***

**NB:** Cloud solutions can be far more reliable and scalable!

 Programming:
 -
- ***Backend***: [Node.js](https://nodejs.org/en) with [Express](https://expressjs.com/)
- ***Frontent***: [Embedded JavaScript templating](https://ejs.co/) and [Bootstrap 5](https://getbootstrap.com/)

Automated application deployment
-
 - Automated the continuous integration and deploymnet (CI/CD) with GitHub Actions