## **Safety Considerations During Robot Learning and Deployment**

While progress in deep learning and computer vision research has been one of the key enablers of deploying
modern robotics systems in the real world, there is an abundance of research, engineering, and regulatory
challenges currently precluding the certification of these systems as safe for deployment around humans
and other animals. Yet, that has not prevented private companies and other organizations from frequently
deploying and testing (semi-)autonomous robot systems in the wild, among humans who have not necessarily
explicitly consented to be part of such experiments. In order for the public to trust autonomous robots,
these systems need to be able to reason about risk and how to minimize it, especially in the face of rare
events. 

>
> 
> In our lab, we aim to provide safety guarantees about the operation of learning based robotic systems.
> This includes making progress on (a) **safe exploration** during the learning process, such as bounding the number
> of mistakes a robot will commit, (b) safety assessments before deployment, in the form of **photorealistic adversarial simulation scenarios** that generate rare events,
> and (c) safety monitoring during deployment through test-time **uncertainty quantification**. 
>
>

While we are focusing our research efforts on directions (a)-(c), we recognize that they will only be partial ingredients
in the formal process of functional safety certification of autonomous robot systems that operate in human
environments. A more holistic view of safety that includes hardware, continuous monitoring of systems in the field,
and lifelong fixes and improvements, are also necessary in solving this very complex puzzle.  

### **Safe Exploration During Reinforcement Learning**

Safe exploration is an oxymoron. Exploration encourages visiting an unseen state or deliberatively attempting a new action, while
safety is about staying close to previously visited states and actions that are known to be relatively low-cost.
A more tractable way to think about safe exploration is in terms of an acceptable tradeoff: what is the maximum
probability of an accident or bad outcomes that we allow our systems to incur, while they optimize for another set of task
objectives or while they try to gather more information about the environment they operate in.      

For safety-critical tasks, such as driving and surgery, we are likely only comfortable with this probability being zero,
i.e. no autonomous exploration in real environments, only learning from human demonstration data. For less safety-critical
systems, for example, robot arms learning to grasp rigid or non-rigid objects, we might be more willing to increase that
probability. This helps our autonomous systems to explore on their own in order to improve their predictive models of how
the world works, and in response, improve their own behavior in it.

There are at least two major technical issues here: first, it is really challenging to have a calibrated estimate of the
probability of an accident for a given autonomous feedback controller (policy); second, we need to ensure that our autonomous
systems provably commit fewer mistakes as they gain more data and experience, preferably at a sublinear rate in terms of the
number of epochs.

Our [Conservative Safety Critics paper](https://arxiv.org/abs/2010.14497) aims to address both of these issues (but only partially succeeds at ensuring safety).
We make use of the [Conservative Q-Learning](https://arxiv.org/abs/2006.04779) method from Aviral Kumar, Aurick Zhou, George Tucker, and Sergey Levine, in order to provably overestimate the probability of an accident. By upper-bounding the overestimate, we conservatively upper-bound the true probability of an accident. We also show (Theorem 3 in the paper) that if the maximum allowed threshold for a probability of failure is set to decrease rapidly in terms of the number of epochs, then the cumulative number of failures for $T$ epochs will grow as $O(\sqrt{T})$.

<div>
  <p align="center">
  <img src="assets/project-assets/images/csc.png"  alt="method diag"/>
  </p>
</div>
<div>
    <p align="center">
        <em>The general overview of how CSC works. Qc denotes the probability of failure. </em>
    </p>
</div>


### **Automatically Generating Adversarial Driving Scenarios in Photorealistic Simulators**

How can we evaluate the performance of self-driving car perception and navigation software in terms of safety
in the face of rare events? One approach is to measure miles per intervention from real driving data on the road.
According to [recent estimates](https://doi.org/10.1016/j.tra.2016.09.010), the number of miles that would have to be driven on the road in order to demonstrate
the safety of a car in a statistically significant sense is in the range of hundreds of millions of miles, which
corresponds to decades of driving, assuming current projections about the sizes of fleets of self-driving
vehicles. Another, complementary, approach is to design rich simulation scenarios that will provide a preliminary
assessment of the self-driving software stack. The question then becomes: what is the best way to design these driving
scenarios in order to minimize the chances of accidents on public roads?


Current best practices for stress-testing self-driving navigation software involve a [semi-autonomous process](https://www.theatlantic.com/technology/archive/2017/08/inside-waymos-secret-testing-and-simulation-facilities/537648/), in which
a human operator specifies the number of cars and pedestrians in the scene, their initial locations and their approximate
trajectories, while their speeds are automatically selected from a wide range of options. Human involvement
and specification renders this process time-consuming and difficult to scale to new environments. Most importantly,
however, it could result in missing critical testing configurations.

[In a paper published at ICRA 2019](http://www.cim.mcgill.ca/~florian/pdfs/icra-2019-adversarial.pdf) we show how to automate the generation of driving scenarios in high-fidelity simulators, by optimizing the behaviors of pedestrians and other vehicles on the road, so that they navigate adversarially with respect to the self-driving vehicle that is being tested. Our proposed system automatically explores and finds parameters of trajectories, in a way that reduces human involvement, and results in possible crashes and dangerous configurations.

<div>
  <p align="center">

<iframe width="560" height="315" src="https://www.youtube.com/embed/TUeCtB9xuKA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </p>
</div>
<div>
    <p align="center">
        <em>Adversarial scenario generation using Bayesian Optimization, treating the simulator as non-differentiable.</em>
    </p>
</div>


### **Generating Adversarial Driving Scenarios in Simulation so that They Transfer in the Real World**

How do we ensure that an adversarial scenario that we find in simulation transfers (remains adversarial to the driving pipeline)
when physically constructed in the real world? Answering this question will help us ensure that we can test autonomous driving
policies in simulation while providing guarantees about their performance in the real world. Consider the following experiment
from our [CoRL 2023 paper](https://arxiv.org/abs/2309.15770): 
<figure>
<p align="center">
  <img src="assets/project-assets/images/adv-scenarios-corl23.png"  alt="method diag"/>  
</p>
</figure>

The first row of images shows a vision-based driving policy that has been trained to do lane following and which manages to execute a full square trajectory along the real track. The second row overlays a random synthetic object on the side of the square track, and adds random texture to that object; the car does not deviate and is still able to execute the square. This means that we need to optimize the texture if we want it to be adversarial to the given driving policy. To do this, we train a NeRF representation of the entire scene and we assume we have a physics-based dynamics model of the car. We can optimize the texture, mesh, and location of the synthetic adversarial object; this is shown in row 4, where the car indeed deviates from its desired trajectory in the NeRF simulation environment. Due to the similarity between NeRF and the real scene, in row 3 we see that the same adversarial object found in simulation actually transfers to the real scene, without further optimization.    

How does the optimization work? We cast adversarial scenario generation as a high-dimensional optimal control problem. Given a known image-based driving policy that we want to attack, as well as the dynamics of the autonomous vehicle, we aim to optimize a photorealistic simulation environment such that it produces sensor observations that are 3D-viewpoint-consistent, but adversarial with respect to the policy, causing it to deviate from its nominal trajectory. The objective of the optimal control problem is to maximize this deviation through plausible perturbations of objects in the photorealistic environment. The figure below shows an overview of the method:  

<figure>
<p align="center">
  <img src="assets/project-assets/images/method-overview-corl23.png"  alt="method diag"/>  
</p>
</figure>

The inner driving loop shown in the figure above consists of three components: the neural rendering model, the differentiable driving
policy, and the differentiable kinematic car model. We inject the adversarial perturbation to the surrogate scene by composing the
outputs of one or more neural object renderers (the single object case is shown above for simplicity) with the output of the neural
background scene renderer. The parameters of the object renderer(s) are optimized to maximize the deviation of the realized trajectory from the
reference trajectory, while keeping the parameters of the driving policy and background scene renderer frozen. The parameters $\theta$ include
the mesh, texture, and the location of the synthetic objects that are optimized. More details are included in our [CoRL 2023 paper](https://arxiv.org/abs/2309.15770).  



