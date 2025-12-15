## **Semantic 3D Mapping**

Building 3D maps of the environment is central to
robot navigation, planning, and interaction with objects in a
scene. Most existing approaches that integrate semantic concepts
with 3D maps largely remain confined to the closed-set setting:
they can only reason about a finite set of concepts, pre-defined
at training time. Further, these maps can only be queried using
class labels, or in more recent work, using text prompts.
We address both these issues with ConceptFusion, a scene
representation that is: (i) fundamentally open-set, enabling rea-
soning beyond a closed set of concepts (ii) inherently multi-modal, enabling a diverse range of possible queries to the
3D map, from language, to images, to audio, to 3D geometry,
all working in concert. ConceptFusion leverages the open-set
capabilities of today’s foundation models that have been pre-
trained on internet-scale data to reason about concepts across
modalities such as natural language, images, and audio. We
demonstrate that pixel-aligned open-set features can be fused into
3D maps via traditional SLAM and multi-view fusion approaches.
This enables effective zero-shot spatial reasoning, not needing
any additional training or finetuning, and retains long-tailed
concepts better than supervised approaches.
<div>
  <p align="center">

<iframe width="560" height="315" src="https://www.youtube.com/embed/rkXgws8fiDs?si=Xqp_xf6gCNlH8h1u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/mRhNkQwRYnc?si=WCnblQj7rWPS5y_7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</p>
</div>

## **Physics-based 3D Perception**

Inferring the shape, pose, kinematics, dynamics, affordances, and physical properties of objects in the scene is of fundamental importance to downstream planning and
control. We are particularly interested in inferring physics-based dynamics models of objects in 3D, based on RGB(D) observations, and we explored this idea in the context of
physics-based human motion tracking from videos in an [ICCV'21 paper](https://nv-tlabs.github.io/physics-pose-estimation-project-page/).

<figure>
<p align="center">
  <img src="assets/project-assets/images/diff_cio_1.jpg"  style="width:90%;" alt="method diag"/>
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


## **Differentiable Physics and Rendering Simulators**

Accurately predicting the dynamics and physical characteristics of objects from video or tactile interactions is a long-standing challenge in 3D perception.
Imagine watching a short video of a basketball bouncing off the ground and ask: ``Can we infer the mass and elasticity of the ball, predict its trajectory,
and make informed decisions, e.g., how to pass and shoot?'' These seemingly simple questions are extremely challenging to answer even for modern computer vision models. The underlying
physical attributes of objects and the system dynamics need to be inferred, even in the face of losing information during the projection from 3D to 2D in
image formation. 

<figure>
<p align="center">
<img src="assets/project-assets/images/gradsim-teaser.jpg"  style="width:90%;" alt="method diag"/>

<figcaption align="center">
     <em><a href="https://gradsim.github.io/">gradSim</a>, a unified differentiable rendering and multiphysics
framework that allows solving a range of control and parameter estimation tasks (rigid bodies, deformable solids, and cloth) directly from images/video. 
</em>
  </figcaption>
</p>

</figure>

<figure>
<p align="center">
<img src="assets/project-assets/images/gradsim-pipeline-v10.jpg"  style="width:90%;" alt="method diag"/>

<figcaption align="center">
     <em> </em>
  </figcaption>
</p>

</figure>

Given video observations of an evolving physical system (e), we randomly initialize scene object properties (a) and evolve them over time using a differentiable physics engine (b), which generates states. Our renderer (c) processes states, object vertices and global rendering parameters to produce image frames for computing our loss. We backprop through this computation graph to estimate physical attributes and controls. Existing methods rely solely on differentiable physics engines and require supervision in state-space (f), while gradSim only needs image-space supervision (g). 


<figure>
<p align="center">
<img src="assets/project-assets/images/gradsim-deformables.jpg"  style="width:70%;" alt="method diag"/>
<figcaption align="center">
     <em>Parameter Estimation: For deformable experiments, we optimize the material properties of a beam to match a video of a beam hanging under gravity. In the rigid experiments, we estimate contact parameters (elasticity/friction) and object density to match a video (GT). We visualize entire time sequences (t) with color-coded blends.</em>
  </figcaption>
</p>
</figure>

<figure>
<p align="center">
<img src="assets/project-assets/images/gradsim-control.jpg"  style="width:70%;" alt="method diag"/>
<figcaption align="center">
     <em>Visuomotor Control: gradSim provides gradients suitable for diverse, complex visuomotor control tasks. For control-fem and control-walker experiments, we train a neural network to actuate a soft body towards a target image (GT). For control-cloth, we optimize the cloth’s initial velocity to hit a target (GT) (specified as an image), under nonlinear lift/drag forces. </em>
  </figcaption>
</p>
</figure>