# Challenge Decision

* Status: Accepted <!-- optional -->
* Deciders: Everyone
* Date: December 02, 2021 <!-- optional -->


## Context and Problem Statement

We have spent a few weeks trying to get the unit tests to work with the database js, but so far jest has been refusing to work with what we have so far, especially regarding our dependencies. It doesn't accept any import statements no matter what we do.

## Decision Drivers <!-- optional -->

* Should we continue trying to create unit testing?
* Do we have enough time to make the unit tests work with the database functions?
* It appears that other groups are also struggling to get the unit tests working, so it might be a greater problem than we can fix currently.

## Considered Options

* Continue grinding out the unit tests
* Focus more on the e2e tests, and decide to put aside the unit tests for the time being

## Decision Outcome

* Focus more on the e2e tests, and decide to put aside the unit tests for the time being

### Positive Consequences <!-- optional -->

* Given the current time constraints, we will be able to focus more on the e2e testing and at least getting those to work
* We don't have to waste more time working on the unit tests with only a week left for development

### Negative Consequences <!-- optional -->

* We won't have unit tests to make sure the database functions are working as intended