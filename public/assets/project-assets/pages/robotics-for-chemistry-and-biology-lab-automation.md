## **Robotics for Lab Automation**

Robotics for lab automation focuses on enabling general-purpose robots to perform complex experiments in chemistry and biology laboratories autonomously and robustly. Our research spans methods in perception, manipulation, planning, and decision-making to replace repetitive manual workflows with intelligent robotic systems that accelerate scientific discovery and improve reproducibility. 

> Automating laboratory workflows stands to transform scientific research by increasing experiment 
> throughput, improving reproducibility, and enabling new modes of discovery where human scientists and
> robots collaborate seamlessly. Our research aims to bridge fundamental robotics with real-world 
> laboratory systems to make **self-driving labs** a practical reality. Our lab collaborates very 
> closely with chemists and biologists at the [Acceleration Consortium](http://acceleration.utoronto.ca/) at the University of Toronto (e.g. Alan Aspuru-Guzik and Milica Radisic). 

Traditional experimentation in chemistry and biology involves labor-intensive and time-consuming 
procedures that limit throughput and scale. In our lab develops AI-driven robotic systems capable of
handling diverse experimental materials (e.g., liquids, powders) and interacting with standard lab 
equipment with high precision and adaptability. By combining 
experiment specification in natural language, with reasoning and planning, as well as vision-based manipulation skills for robotics, we want to: (a) automate repetitive and multi-step experiments, allowing human scientists to focus on experiment design and analysis of results; (b) improve reliability and reproducibility across experimental runs; (c) accelerate data generation for hypothesis testing, materials discovery, and biological assays; (d) integrate with high-level experiment planning and optimization frameworks to close the loop from planning to execution. 

### Robotics Research Challenges

Lab automation robotics introduces unique challenges and opportunities that make it a hybrid between industrial automation robotics and home robotics. In chemistry and biology labs robots must perceive and manipulate a wide variety of delicate tools, containers, and biological or chemical samples with high precision, often under cluttered and visually complex conditions. Because experimental setups vary frequently, systems must generalize to new equipment and layouts without extensive reconfiguration. Safe interaction is essential: robots need to perform contact-rich actions without damaging fragile glassware, compromising sterility, or disrupting ongoing experiments, while also operating safely around human scientists. The long-horizon nature of many protocols, spanning dozens of steps and unfolding over hours or days, requires reliable monitoring, error detection, and recovery throughout execution. Moreover, robotic platforms must integrate seamlessly with scientific workflows so that data, observations, and experiment goals can inform subsequent actions in a closed scientific loop. These constraints make lab automation a demanding testbed for perception, manipulation, planning, and decision-making methods.

### Optimal Experiment Design Challenges

Discovering molecules with desirable properties is crucial for drug design, materials science, and chemical engineering. Given the vast chemical space, exhaustive evaluation is infeasible. Density functional theory (DFT) simulations are computationally expensive and experiments are laborious and time-consuming. Bayesian Optimization promises to minimize costly evaluations and accelerate discovery by using acquisition functions, expressed as the expected utility under a surrogate model (e.g., Gaussian Processes (GPs) and Bayesian Neural Networks (BNNs)) to guide the search toward promising candidates, balancing exploration of uncertain regions with exploitation of high observed-value regions.
However, BayesOpt does not leverage the vast amounts of scientific knowledge distilled into large foundation models for chemistry and biology. We therefore need to develop new exploration and experiment design methods that combine the best of both worlds, or perform better at scale than traditional methods.   

### Representative Projects & Publications

Below are representative contributions that illustrate our lab’s research in lab automation:

#### *ORGANA*
[https://arxiv.org/abs/2401.06949](https://arxiv.org/abs/2401.06949) 

A robotic assistant for automated chemistry experimentation and characterization, integrating manipulation with analytical workflows. 

<div>
  <p align="center">

<iframe width="560" height="315" src="https://www.youtube.com/embed/fpe1_2FeMnE?si=bvC6fg-awT9R18jJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>
  </p>
</div>



#### *RoboCulture*
[https://arxiv.org/abs/2505.14941](https://arxiv.org/abs/2505.14941)

A general-purpose robotic platform for automated biological experimentation that performs liquid handling and real-time monitoring using vision and force feedback. Demonstrated autonomous execution of long-duration yeast culture experiments. 

<div>
  <p align="center">

<video width="70%" controls>
  <source src='https://ac-rad.github.io/roboculture/static/videos/S9.mp4' type="video/mp4">
  Your browser does not support the video tag.
</video>

<video width="70%" controls>
  <source src='https://ac-rad.github.io/roboculture/static/videos/S6.mp4' type="video/mp4">
  Your browser does not support the video tag.
</video>

<video width="70%" controls>
  <source src='https://ac-rad.github.io/roboculture/static/videos/S11.mp4' type="video/mp4">
  Your browser does not support the video tag.
</video>

  </p>
</div>



#### *MATTERIX* 

A digital twin for robotics-assisted chemistry lab automation, presenting a framework for simulating and optimizing laboratory procedures with robotic agents. 

<figure>
<p align="center">
<img src="assets/publication-thumbnails/matterix.webp"  style="width:80%;" alt="method diag"/>
<figcaption align="center">
     <em></em>
  </figcaption>
</p>
</figure>

#### *CLAIRIFY*
[https://arxiv.org/abs/2303.14100](https://arxiv.org/abs/2303.14100)

[https://arxiv.org/abs/2212.09672](https://arxiv.org/abs/2212.09672)

CLAIRIFY is an approach that combines automatic iterative prompting with program verification to ensure programs written in data-scarce domain-specific language are syntactically valid and incorporate environment constraints. Our approach provides effective guidance to the language model on generating structured-like task plans by incorporating any errors as feedback, while the verifier ensures the syntactic accuracy of the generated plans. We demonstrate the effectiveness of CLAIRIFY in planning chemistry experiments by achieving state-of-the-art results. We also show that the generated plans can be executed on a real robot by integrating them with a task and motion planner.

<div>
  <p align="center">

<iframe width="560" height="315" src="https://www.youtube.com/embed/-87yrXytluw?si=cFaJa6Z7Oe9seFyr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</p>
</div>




<div>
  <p align="center">

  <iframe width="560" height="315" src="https://www.youtube.com/embed/lnXevj4Mm8A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </p>
</div>


