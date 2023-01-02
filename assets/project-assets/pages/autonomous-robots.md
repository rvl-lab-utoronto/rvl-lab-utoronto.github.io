
## **Autonomous Robots for Environmental Monitoring**

One of the main functions of robots in the context of environmental monitoring
is to collect scientifically relevant data for end users. Typically, these users are not
experts in robotics, they are oceanographers, biologists, ecologists, geographers, physicists,
and chemists. Their end goal is not to learn how to use robots (even though many of them do),
but rather to get high-quality observations of the phenomena they want to study and model. For
them, robots that carry science instruments and sensors are a means to an end. One of our research
themes at RVL is to work together with scientists to enable robust autonomous robots that
collect useful environmental data on behalf of, or together with, scientists.

>
> We want to enable fully autonomous robots to collect environmental data and samples like scientists would.
> This effort includes searching for sites and features of interest, exploring for unseen features,
> and autonomously selecting what to measure and where (optimal experiment design) and reliably navigating there.  
>

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
  <img src="assets/project-assets/images/curiosity.jpg" style="width:80%;"  alt="method diag"/>
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
  <img src="assets/project-assets/images/argo.png" style="width:80%;"  alt="method diag"/>
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
  <img src='assets/project-assets/images/great_barrier_reef.jpg' style="width:80%;"  alt="method diag"/>
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

[Stochastic Planning for ASV Navigation Using Satellite Images (under review, ICRA 2023)](https://arxiv.org/abs/2209.11864)

Our goal here is to use an autonomous boat to monitor lake environments and collect water samples for scientists. To make the system
robust, we propose to identify uncertainties (e.g., obstacles, wind-prone areas) that could block waterways, incorporate
them into the map, and generate stochastic policies that can adapt online. One planning framework that is suitable for
modeling uncertain paths is the [Canadian Traveler Problem (CTP)](https://www.sciencedirect.com/science/article/pii/0304397591902632). The most significant feature in a CTP graph is the
stochastic edge, which has a probability of being blocked. The state of any stochastic edge can be disambiguated by
visiting the edge. In this paper, we propose a navigation framework — the Partial Covering Canadian Traveler Problem (PCCTP) — to
solve a route-planning problem in an uncertain environment. The framework uses a stochastic graph derived from coarse
satellite images to plan an adaptive policy that visits all reachable target locations. Stochasticity in the graph repre-
sents possible events where a water passage between two points is blocked due to changing water levels, strong wind,
and other unmapped obstacles.

<figure>
<p align="center">
<img src="assets/slideshow/boat_1.jpg"  style="width:80%;" alt="method diag"/>
<figcaption align="center">
     <em></em>
  </figcaption>
</p>
</figure>


[Vision-Based Goal-Conditioned Policies for Underwater Navigation in the Presence of Obstacles (RSS 2020)](http://www.roboticsproceedings.org/rss16/p048.html)

This paper is about learning vision-based underwater navigation policies that are conditional on waypoints, but at the same time
want to record useful footage of the environment (e.g. coral reefs).



<div>
  <p align="center">

  <iframe width="560" height="315" src="https://www.youtube.com/embed/qpcmwb_7QA4" title="YouTube video player"
  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  		  allowfullscreen></iframe>

  </p>
</div>


Our main framework consists of 3 major phases. In the first phase, a non-goal conditional policy is learned through behavior cloning, using expert-labeled images for obstacle avoidance and scientific data collection. Second, we run the policy learned with some exploration bias and generate dense, goal-conditioned action labels, from which we can train a goal-conditioned policy using hindsight relabelling. Third, in the deployment phase, the robot is given a sequence of waypoints to navigate to while simultaneously satisfying higher-level tasks, such as surveying coral.

<figure>
<p align="center">
<img src="assets/project-assets/images/block-diagram-rss2020.png"  style="width:80%;" alt="method diag"/>
<figcaption align="center">
     <em></em>
  </figcaption>
</p>
</figure>

Here are some examples of how this visual navigation policy manages the tradeoff between efficiency (shortest path to the goal)
and scientifically relevant data collection.

<figure>
<p align="center">
<img src="assets/project-assets/images/scenic-route-vs-shortest-path-rss2020.png"  style="width:50%;" alt="method diag"/>
<figcaption align="center">
     <em>Sample trajectories from simulation illustrating the behavioural differ-
ences between the proposed goal conditioned model and a direct policy model
which travels straight to the goal. The goal conditioned model maximizes coral
visited along its path while simultaneously reaching the goal.</em>
  </figcaption>
</p>
</figure>



[One-Shot Informed Robotic Visual Search in the Wild (IROS 2020)](https://arxiv.org/abs/2003.10010)

We consider the task of underwater robot navigation for the purpose of collecting scientifically relevant
video data for environmental monitoring. The majority of field robots that currently perform monitoring tasks in unstructured
natural environments navigate via path-tracking a pre-specified  sequence of waypoints. Although this navigation method is often
necessary, it is limiting because the robot does not have a model of what the scientist deems to be relevant visual observations.
Thus, the robot can neither visually search for particular types of objects, nor focus its attention on parts of the scene that
might be more relevant than the pre-specified waypoints and viewpoints. 


<div>
  <p align="center">

  <iframe width="560" height="315" src="https://www.youtube.com/embed/0i_el5XGCus" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  </p>
</div>

In this paper we propose a method that enables
informed visual navigation via **a learned visual similarity operator** that guides the robot’s visual search towards parts
of the scene that look like an exemplar image, which is given by the user as a high-level specification for data collection. We
propose and evaluate a weakly supervised video representation learning method that outperforms ImageNet embeddings for
similarity tasks in the underwater domain. We also demonstrate the deployment of this similarity operator during informed
visual navigation in collaborative environmental monitoring scenarios, in large-scale field trials, where the robot and a
human scientist collaboratively search for relevant visual content.

<figure>
<p align="center">
<img src="assets/project-assets/images/visual-search-iros2020.png"  style="width:70%;" alt="method diag"/>
<figcaption align="center">
     <em>The output of our visual similarity operator, which is informed by a
single exemplar image, given by the user. The exemplar image dictates the
behavior of the similarity operator. Note that the exemplars are not objects
in the input image; they are objects from the same class, collected from
different viewpoints and appearances</em>
  </figcaption>
</p>
</figure>



[Multi-Domain Monitoring of Marine Environments Using a Heterogeneous Robot Team (IROS 2012)](assets/pdf/iros2012_multirobot_env_monitoring.pdf)

In this paper we describe a heterogeneous multirobot system for assisting scientists in environmental monitoring
tasks, such as the inspection of marine ecosystems. This team of robots is comprised of a fixed-wing aerial vehicle, an
autonomous airboat, and an agile legged underwater robot. These robots interact with off-site scientists and operate in a
hierarchical structure to autonomously collect visual footage of interesting underwater regions, from multiple scales and
mediums. We discuss organizational and scheduling complexities associated with multi-robot experiments in a field robotics
setting. We also present results from our field trials, where we demonstrated the use of this heterogeneous robot team to
achieve multi-domain monitoring of coral reefs, based on realtime interaction with a remotely-located marine biologist.


<figure>
<p align="center">
<img src="assets/project-assets/images/multirobotsystem-iros2012.png"  style="width:70%;" alt="method diag"/>
<figcaption align="center">
     <em></em>
  </figcaption>
</p>
</figure>

During a typical monitoring session, our UAV continuously collects
aerial footage of a reef region and relays them to scientists
via the internet. Based on this live footage, the scientists
then suggest sites for further inspection to the team of
robots, which subsequently coordinate with each other to
autonomously collect visual footage of these target regions.
Our system thus provides comprehensive visual coverage of
the specified reef sites, both from a broad aerial view and
a close-up underwater view. This autonomous robotic team
also significantly improves the efficiency of the monitoring
process, by shifting the scientists’ focus from laborious data
collection to the selection of survey regions.


<div>
  <p align="center">

  <iframe width="560" height="315" src="https://www.youtube.com/embed/DvWVC5R0zqs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  
  </p>
</div>


