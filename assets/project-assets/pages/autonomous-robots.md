
## **Autonomous Robots for Environmental Monitoring**

One of the main functions of robots in the context of environmental monitoring
is to collect scientifically relevant data for end users. Typically, these users are not
experts in robotics, they are oceanographers, biologists, ecologists, geographers, physicists,
and chemists. Their end goal is not to learn how to use robots (even though many of them do),
but rather to get high-quality observations of the phenomena they want to study and model. For
them, robots that carry science instruments and sensors are a means to an end. One of our research
themes at RVL is to work together with scientists to enable robust autonomous robots that
collect useful environmental data on behalf of, or together with, scientists.

> We want to enable fully autonomous robots to collect data like scientists would.

The areas and volumes these robots are tasked to inspect are too vast to cover exhaustively, so
a major challenge in retrieving relevant sensor data is to enable informed sensing in physical space.
Autonomous robots need to pay attention to the right parts of the environment in a way that
balances *exploration*, to seek out observations that the scientist might consider novel or surprising,
and *exploitation*, to record data that the user already knows they will be interested in.

### **Why aim for fully autonomous robots?**

Many robotics technologies that have been deployed so far
for environmental monitoring have been either semi-autonomous or not sufficiently intelligent
to collect data like scientists. Consider the following example:


<!-- Not including the image this way because md can't center it
![Mars Curiosity rover](assets/project-assets/images/curiosity.jpg)
-->

<div>
  <p align="center">
  <img src="assets/project-assets/images/curiosity.jpg"  alt="method diag"/>
  </p>
</div>
<div>
    <p align="center">
        <em>Mars Curiosity Rover. Image courtesy of NASA.</em>
    </p>
</div>

Existing Mars exploration rovers, such as Curiosity, are endowed with robust autonomous
visual navigation capabilities that can traverse a sequence of waypoints within a
small geographic area. However, scientists back on Earth are closely involved
with the selection and specification of these waypoints, and rovers are typically
not trusted with deciding scientifically-relevant waypoints on their own. This approach
makes sense given the cost, logistics, time, and risk involved in landing a $2.5B rover
on the unhospitable surface of Mars.

But what if cost is not a major issue in the long-term future and we manage to afford to send
hundreds or thousands of rovers on other planets? Then, fully autonomous rovers capable of
doing full waypoint selection on their own become a necessity, because it is not scalable for
humans to closely supervise the scientific data collection and sampling that these robots will do.


### **Mobile robots vs stationary or drifting sensors**

In some challenging environments, especially oceans, it is necessary to not hold on too tightly to the idea that robots need to be actuated
and mobile, in the way that a rover or a boat is. Consider for example the [Argo network](https://argo.ucsd.edu/)
of thousands of drifting floats that measure temperature, salinity, and biogeochemical components of the
world’s oceans.

[Each battery-powered float](https://argo.ucsd.edu/how-do-floats-work/) spends almost all its lifespan (3-6 years) below the water surface up to 2-6km,
carried by currents and having little actuation over its position aside from some buoyancy and depth control.
When surfacing every 10 days, each float transmits sensor data via satellite, and scientists, policy-makers,
and members of the public can freely access the measurements on the internet.

<div>
  <p align="center">
  <img src="assets/project-assets/images/argo.png"  alt="method diag"/>
  </p>
</div>
<div>
    <p align="center">
        <em>How an Argo float works. Image <a href="https://argo.ucsd.edu/wp-content/uploads/sites/361/2020/06/float_cycle_1.png">courtesy</a> of UCSD and the Argo program.</em>
    </p>
</div>

In order to gather evidence on climate change and monitor its effects on our oceans and fragile marine ecosystems
we need to have automated and consistent environmental monitoring. The [Argo network](https://argo.ucsd.edu/) and
similar impactful efforts are a very valuable part of the overall solution. The other, complementary part of the
solution is having autonomous underwater vehicles that can regularly inspect the same location or get more measurements
of the seafloor, coral reefs, and coastal environments. If regular visual observations of a particular location are
required, drifting sensors will not be able to acquire and deliver them because they have no control over their position.


### **Environmental monitoring using autonomous robots vs humans**

Current best practices in monitoring the health of marine environments such as coral reefs rely heavily on manual logging by
human divers, typically expert marine biologists. This requires a lot of human effort and is painstakingly slow and small-scale, as the diver
can only visit a small number of underwater locations each day.

<div>
  <p align="center">
  <img src='assets/project-assets/images/great_barrier_reef.jpg'  alt="method diag"/>
  </p>
</div>
<div>
    <p align="center">
        <em>Manual data collection and inpection at the Great Barrier Reef (<a href="https://www.abc.net.au/news/image/9001768-3x2-940x627.jpg">source</a>).</em>
    </p>
</div>

Robotics has a fundamental role to play in overcoming these inefficiencies and bridging the gap between human and
robot data collection for environmental monitoring. 

### **Some of our representative papers in this area**

[Vision-Based Goal-Conditioned Policies for Underwater Navigation in the Presence of Obstacles (RSS 2020)](http://www.roboticsproceedings.org/rss16/p048.html)

[One-Shot Informed Robotic Visual Search in the Wild (IROS 2020)](https://arxiv.org/abs/2003.10010)

[Multi-Domain Monitoring of Marine Environments Using a Heterogeneous Robot Team (IROS 2012)](assets/pdf/iros2012_multirobot_env_monitoring.pdf)

