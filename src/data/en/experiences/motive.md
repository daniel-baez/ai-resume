---
title: "Senior Software Engineer"
company: "Motive (formerly KeepTruckin)"
period: "October 2019 - Present"
location: "San Francisco, CA"
order: 1
pdf: true
---

Motive has been an incredible journey. From the start, I believed deeply in our mission. As a Chilean and a student of my country’s history, I understand how essential logistics and goods distribution are to maintaining a functioning social contract.

I joined when our engineering team was still small—around 40 engineers working closely with the CTO in downtown San Francisco. Those early days were some of the most inspiring of my career.

Starting as an individual contributor, I delivered foundational improvements to our core systems. My first project was building a [language-agnostic point-query cache layer](https://medium.com/motive-eng/how-we-reduced-db-load-with-our-language-agnostic-point-query-cache-3a628edfee4e), which reduced database load and remains in production six years later, handling hundreds of thousands of requests per second during peak hours.

Over time, I drove several key backend initiatives focused on performance, evolution, and reliability, including:

- Introducing connection pooling for high-throughput I/O resources such as Redis.  
- Establishing the practice of feature-flagging critical releases — now a company-wide standard.  
- Developing tracing libraries in both Golang and Rails, initially for my own needs but later adopted organically by over 100 projects as the de facto standard.  



As the company scaled, our monolithic “platform” team split into specialized groups, and I transitioned to the IoT Platform team—critical to Motive’s identity as an IoT and AI company. At the time, the team had only two engineers. I took ownership of one of our primary ingestion pipelines for edge-to-cloud data transfer, which today handles roughly 40% of all uploads—about 60 million per week.

**The work I’m most proud of**, however, is leading the complete reinvention of our configuration system—a backbone of Motive’s operations. During the 2023 holiday period, I assumed responsibility for the system, which was in crisis yet crucial to several upcoming launches.

At the time, configuration updates could take **up to 60 hours** to reach the edge, and provisioning a new configuration could take **two weeks**. I worked relentlessly to bring the system back to life and make configuration **real-time** and **observable** across all product lines.

## **Key Contributions**

- Designed a **hierarchical profile structure** (company → vehicle → device) enabling fine-grained configuration of different device populations.  
- Introduced full **visibility and monitoring** across all configuration flows.  
- Re-engineered the pipeline to be **event-driven**, reducing end-to-end latency from days to seconds.  
- Delivered a **new back-office experience**, enabling new settings to be created and rolled out instantly.  

## **Impact**

- Made **global configuration pushes** possible — we can now reconfigure millions of trucks multiple times per day.  
- Became the foundation for all **15+ AI models** running across continents; every model depends on this system’s flexibility.  
- Enabled **A/B testing** capabilities as a natural by-product of the design.  
- Provided an unmatched **trial experience**, allowing behavior changes on demand for enterprise customers such as **Cintas** and **FedEx**.  
- Integrated configuration directly into the **edge-developer workflow**, so declaring a setting in code automatically exposes it to live fleets through admin tools.
