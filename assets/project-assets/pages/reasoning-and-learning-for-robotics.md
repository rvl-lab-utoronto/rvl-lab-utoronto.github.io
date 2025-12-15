## **Reasoning and Learning for Robotics**

The intersection of robotics and machine learning research has been one of the key enablers of progress that is leading robotics technologies to be deployed in the real world.
One one hand, manually-engineered robotics methods usually make strong assumptions about the distribution of sensor data streams, and are typically brittle in practice.
On the other hand, when machine learning methods are applied to robotics problems without taking into account the constraints imposed by physics or the inherent
structure of the problem at hand, they end up generalizing poorly, and cannot address physical reasoning and out-of-distribution tasks in the real world. There is a lot of work to do
in the middle of these two ends of the spectrum to figure out what are the best ways for robots to learn to improve their performance, while leveraging the physics structure of the underlying
problems we want them to tackle.

>
> 
> We want to enable robots to interact effectively with humans and the physical world.
> Robots need to learn from their own experience, from other robots' experience, from vast streams of simulated data,
> and from limited human supervision and intervention. 
>
>

### **Learning to Search in Task and Motion Planning**

Task and motion planning (TAMP) involves searching over both symbolic actions that determine a high-level task sequence and low-level motion controls that result in feasible trajectories.
The symbolic task planner operates on high-level abstractions of the environment, including object definitions, operations that can be applied to them, and pre- and post-conditions that these
operations have to satisfy. On the other hand, the motion planner requires a non-abstracted description of its surrounding environment. The motion planner informs the symbolic planner about the
kinematic and dynamic feasibility of a proposed coarse task plan, possibly leading to backtracking.

This interplay between high and low level planning has a significant effect on the total runtime of discovering a solution. Symbolic planning can scale exponentially with the number of objects and
task variables, making an exhaustive search over task sequences prohibitive. We are developing machine learning methods that learn planning heuristics to reduce the runtime of TAMP methods, as more
planning queries are successfully solved by the planner across different environments. One of the learning-to-search methods we have developed has used Graph Neural Networks to encode instances of symbolic planning
problems, trying to predict a ranking of high-level actions to be attempted next, given an unseen problem instance. [Our learning-based TAMP paper](https://arxiv.org/abs/2111.13144) is summarized in this video:   

<div>
  <p align="center">

  <iframe width="560" height="315" src="https://www.youtube.com/embed/pzzpR4wh_Zk" title="YouTube video player" frameborder="0"
  	  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>
</div>

[In a follow up paper](https://arxiv.org/abs/2210.14055) we developed a better learning-based TAMP solver, called LAZY, which enabled posterior updates of the learned heuristic with runtime experience collected during the execution of the plan.

<figure>
<p align="center">
  <img src="assets/project-assets/images/lazy-policy-diagram-1.jpg" style="width:80%;" alt="method diag"/>
  <figcaption align="center">
   <em> </em>  
  </figcaption>
</p>
</figure>


<figure>
<p align="center">
  <img src="assets/project-assets/images/train-vs-solve-lazy.jpg"  style="width:70%;" alt="method diag"/>
  <figcaption align="center">
   <em> Planning time decreases and more problems are solved, as the planning heuristic is trained on more data (solutions to previously solved problems). See <a href="https://arxiv.org/abs/2210.14055">our paper</a> for more details.</em>  
  </figcaption>
</p>
</figure>


There are many reasons we are excited about task and motion planning methods that are flexible enough to improve over time and to handle dynamic objects, one of them being that such methods could allow
for simultaneous optimization of the planning, control, and perception systems considered holistically, while respecting the structure of all individual components. Additionally, task and motion planning
methods are fundamental in a variety of applications areas, ranging from multi-robot manipulation, assembly, and construction applications, to autonomous robots operating in chemistry labs, possibly
around human chemists. See for example [our collaborative paper](https://arxiv.org/abs/2212.09672) on how we use task and constrained motion planning solvers to enable multi-step chemistry experiments:

<div>
  <p align="center">

  <iframe width="560" height="315" src="https://www.youtube.com/embed/lnXevj4Mm8A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </p>
</div>






### **Machine Learning for Optimal Control**

Mobile manipulators consist of a mobile platform equipped with one or more robot arms and are of interest for a wide array of challenging tasks because of their extended workspace and dexterity. Typically, mobile manipulators are deployed in slow-motion collaborative robot scenarios. [In a paper published at IROS'20](https://arxiv.org/abs/2003.07489) we consider scenarios where accurate high-speed motions are required. We introduce a framework for this regime of tasks including two main components: (i) a bi-level motion optimization algorithm for real-time trajectory generation, which relies on Sequential Quadratic Programming (SQP) and Quadratic Programming (QP), respectively; and (ii) a learning-based controller optimized for precise tracking of high-speed motions via a learned inverse dynamics model. We evaluate our framework with a mobile manipulator platform through numerous high-speed ball catching experiments:



<figure>
<p align="center">
<img src="assets/slideshow/ball_catching_ke.gif"  style="width:70%;" alt="method diag"/>
<figcaption align="center">
     <em></em>
  </figcaption>
</p>
</figure>
