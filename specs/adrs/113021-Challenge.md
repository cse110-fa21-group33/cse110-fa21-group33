# Challenge Decision

* Status: Accepted <!-- optional -->
* Deciders: Everyone
* Date: November 30, 2021 <!-- optional -->


## Context and Problem Statement

We weren't quite sure about how exactly we were going to implement the challenge features with different ideas floating around since challenges can come in various different ways.

## Decision Drivers <!-- optional -->

* How can we implement challenges in a way that is easy to track?
* How can we implement them in a way that leaves room for future challenges to be made (possibly by the user)?
* How do we deal with the case that users may delete recipes?

## Considered Options

* Challenges based on a number of recipes from a certain spice level
* Challenges based on specific recipes
* Challenges based on an ingredient

## Decision Outcome

Chosen option: Challenges based on specific recipes 

### Positive Consequences <!-- optional -->

* A very flexible and easy way to make challenges since it isn't limited by any specific attribute of the recipe
* Easy to keep track of since we have a specific number of challenges
* Easy to track which recipes are part of a challenge

### Negative Consequences <!-- optional -->

* Some limitations since we can't do challenges based on a specific spice level
* We will have to disallow users from deleting recipes that are a part of the challenge
* A few jsons will have to be updated when adding a new challenge