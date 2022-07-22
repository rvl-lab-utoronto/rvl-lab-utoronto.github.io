## **Learning to Plan, Perceive, and Control**

The intersection of robotics and machine learning research has been one of the key enablers of progress that is leading robotics technologies to be deployed in the real world.
One one hand, manually-engineered robotics methods usually make strong assumptions about the distribution of sensor data streams, and are typically brittle in practice.
On the other hand, when machine learning methods are applied to robotics problems without taking into account the constraints imposed by physics or the inherent
structure of the problem at hand, they end up generalizing poorly, and cannot address physical reasoning and out-of-distribution tasks in the real world. There is a lot of work to do
in the middle of these two ends of the spectrum to figure out what are the best ways for robots to learn to improve their performance, while leveraging the physics structure of the underlying
problems we want them to tackle.

>
> 
> We aim to enable robots to learn to interact effectively with a dynamic 3D world and the humans around them.
> Robots need to learn from their own experience, from other robots' experience, from vast streams of simulated data,
> and from limited human supervision. 
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

There are many reasons we are excited about task and motion planning methods that are flexible enough to improve over time and to handle dynamic objects, one of them being that such methods could allow
for simultaneous optimization of the planning, control, and perception systems considered holistically, while respecting the structure of all individual components. Additionally, task an motion planning
methods are fundamental in a variety of applications areas, ranging from multi-robot manipulation, assembly, and construction applications, to autonomous robots operating in chemistry labs, possibly
around human chemists.  

### **Physics-based 3D Perception**

Inferring the shape, pose, kinematics, dynamics, affordances, and physical properties of objects in the scene is of fundamental importance to downstream planning and
control. We are particularly interested in inferring physics-based dynamics models of objects in 3D, based on RGB(D) observations, and we explored this idea in the context of
physics-based human motion tracking from videos in an [ICCV'21 paper](https://nv-tlabs.github.io/physics-pose-estimation-project-page/).

<figure>
<p align="center">
  <img src="assets/project-assets/images/diff_cio_1.png"  style="width:90%;" alt="method diag"/>
<figcaption align="center">
     <em> Estimated motion of human skeleton from video, remapped into a synthetic human mesh. Contact forces are inferred from video, without the need for motion capture. <a href="https://nv-tlabs.github.io/physics-pose-estimation-project-page/">Source.</a> </em>
  </figcaption>
</p>

</figure>


<div>
  <img align="left" src="assets/project-assets/images/freekick.gif" style="width:48%;" alt="method diag"/>
  <img align="right" src="assets/project-assets/images/sprint.gif"  style="width:48%;" alt="method diag"/>

  <p align="center">
     <em>Estimated motion of human skeleton from video. Contact forces are inferred from video, without the need for motion capture. <a href="https://nv-tlabs.github.io/physics-pose-estimation-project-page/">Source.</a> </em>
  </p>
</div> 


### **Differentiable Physics and Rendering Simulators**

Accurately predicting the dynamics and physical characteristics of objects from video or tactile interactions is a long-standing challenge in 3D perception.
Imagine watching a short video of a basketball bouncing off the ground and ask: ``Can we infer the mass and elasticity of the ball, predict its trajectory,
and make informed decisions, e.g., how to pass and shoot?'' These seemingly simple questions are extremely challenging to answer even for modern computer vision models. The underlying
physical attributes of objects and the system dynamics need to be inferred, even in the face of losing information during the projection from 3D to 2D in
image formation. 

<figure>
<p align="center">
<img src="assets/project-assets/images/gradsim-teaser.png"  style="width:90%;" alt="method diag"/>

<figcaption align="center">
     <em><a href="https://gradsim.github.io/">gradSim</a>, a unified differentiable rendering and multiphysics
framework that allows solving a range of control and parameter estimation tasks (rigid bodies, deformable solids, and cloth) directly from images/video. 
</em>
  </figcaption>
</p>

</figure>

<figure>
<p align="center">
<img src="assets/project-assets/images/gradsim-pipeline-v10.png"  style="width:90%;" alt="method diag"/>

<figcaption align="center">
     <em> </em>
  </figcaption>
</p>

</figure>

Given video observations of an evolving physical system (e), we randomly initialize scene object properties (a) and evolve them over time using a differentiable physics engine (b), which generates states. Our renderer (c) processes states, object vertices and global rendering parameters to produce image frames for computing our loss. We backprop through this computation graph to estimate physical attributes and controls. Existing methods rely solely on differentiable physics engines and require supervision in state-space (f), while gradSim only needs image-space supervision (g). 


<figure>
<p align="center">
<img src="assets/project-assets/images/gradsim-deformables.png"  style="width:70%;" alt="method diag"/>
<figcaption align="center">
     <em>Parameter Estimation: For deformable experiments, we optimize the material properties of a beam to match a video of a beam hanging under gravity. In the rigid experiments, we estimate contact parameters (elasticity/friction) and object density to match a video (GT). We visualize entire time sequences (t) with color-coded blends.</em>
  </figcaption>
</p>
</figure>

<figure>
<p align="center">
<img src="assets/project-assets/images/gradsim-control.png"  style="width:70%;" alt="method diag"/>
<figcaption align="center">
     <em>Visuomotor Control: gradSim provides gradients suitable for diverse, complex visuomotor control tasks. For control-fem and control-walker experiments, we train a neural network to actuate a soft body towards a target image (GT). For control-cloth, we optimize the cloth’s initial velocity to hit a target (GT) (specified as an image), under nonlinear lift/drag forces. </em>
  </figcaption>
</p>
</figure>


