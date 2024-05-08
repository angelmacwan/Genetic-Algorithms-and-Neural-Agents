# Intro
Inspired by Charles Darwin’s Theory of Natural Evolution, Genetic Algorithms uses a heuristic approach that reflects the process of natural selection. Each member of a generation will have their individual DNA object which in this case will be a neural network. Weights, biases, and outputs of these objects will act as genetic material which will be used to form a new population. Another method of training an agent is by using Imitation Learning (also called Behavior Cloning). Humans often learn how to perform tasks via imitation: they observe others perform a task, and then very quickly infer the appropriate actions to take based on their observations. Extending this paradigm to autonomous agents allows us to train these autonomous agents to imitate human behavior by training them on human-generated data.


# Genetic Algorithms
Genetic Algorithms are heuristic algorithms that are used to evolve smart agents from a seemingly random population.
Darwinian Natural Selection proposes three core principles: **Heredity**, **Variation**, and **Selection**.

1. Heredity: If creatures live long enough to reproduce, then their traits are passed down to their children in the next generation.
2. Variation: There must be a variety of traits present in the population or a means with which to introduce variation. Without any variety in the population, the children will always be identical to the parents and to each other.
3. Selection: This is typically referred to as “survival of the fittest.” A DNA or agent with a higher fitness will have a higher chance of passing down its gene to the next generation.

The process of natural selection starts with the selection of the fittest individuals from a population. They produce offspring which inherit the characteristics of the parents and will be added to the next generation. If parents have better fitness, their offspring will be better than their parents and have a better chance of surviving. This process keeps on iterating and in the end, a generation with the fittest individuals will be found.

Pseudocode
```
START
Generate Initial Population
Compute Fitness
REPEAT
	Selection
	Crossover
	Mutation
	Compute Fitness
UNTIL population has converged
STOP
```

# Imitation Learning (Behavior Cloning)
Imitation Learning remains one of the simplest machine learning methods to acquire robotic skills in the real world. It is a method by which human sub-cognitive skills can be captured and reproduced in a computer program. As the human subject performs the skill, his or her actions are recorded along with the situation that gave rise to the action. A log of these records is used as input to a learning program. The learning program outputs a set of rules that reproduce the skilled behavior. This method can be used to construct automatic control systems for complex tasks for which classical control theory is inadequate.


The goal of this study was to go over the two most widely used algorithms for training autonomous agents. Genetic Algorithms are very useful when training data is not available or the outcome of a system is undetermined. Genetic algorithms can often produce surprising behaviors that lead to the solution in a manner that was previously unknown. For example, bugs in a physics engine were used as an exploit in a study conducted by OpenAI titled ’Emergent Tool Use from Multi-Agent Interaction’ Methods such as Imitation Learning and Behavior Cloning is much more effective if enough data is available and the desired outcome is predetermined. The behavior and movement of a human can be recorded and simply transferred over to a simulation or a robot if the environment is static.

In the case of a dynamic and rapidly changing environment, more data is required covering almost all conditions.
