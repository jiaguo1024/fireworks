// Base firework acceleration.
// 1.0 causes fireworks to travel at a constant speed.
// Higher number increases rate firework accelerates over time.
const FIREWORK_ACCELERATION = 1.02;

// Minimum firework brightness.
const FIREWORK_BRIGHTNESS_MIN = 10;

// Maximum firework brightness.
const FIREWORK_BRIGHTNESS_MAX = 50;

// Base speed of fireworks.
const FIREWORK_SPEED = 10;

// Base length of firework trails.
const FIREWORK_TRAIL_LENGTH = 2;

// Determine if target position indicator is enabled.
const FIREWORK_TARGET_INDICATOR_ENABLED = false;

// Minimum particle brightness.
const PARTICLE_BRIGHTNESS_MIN = 50;

// Maximum particle brightness.
const PARTICLE_BRIGHTNESS_MAX = 100;

// Base particle count per firework.
const PARTICLE_COUNT = 200;

// Minimum particle decay rate.
const PARTICLE_DECAY_MIN = 0.01;

// Maximum particle decay rate.
const PARTICLE_DECAY_MAX = 0.02;

// Base particle friction.
// Slows the speed of particles over time.
const PARTICLE_FRICTION = 0.92;

// Base particle gravity.
// How quickly particles move toward a downward trajectory.
const PARTICLE_GRAVITY = 0.2;

// Variance in particle coloration.
const PARTICLE_HUE_VARIANCE = 10;

// Base particle transparency.
const PARTICLE_TRANSPARENCY = 1;

// Minimum particle speed.
const PARTICLE_SPEED_MIN = 1;

// Maximum particle speed.
const PARTICLE_SPEED_MAX = 10;

// Base length of explosion particle trails.
const PARTICLE_TRAIL_LENGTH = 5;

// Alpha level that canvas cleanup iteration removes existing trails.
// Lower value increases trail duration.
const CANVAS_CLEANUP_ALPHA = 0.3;

// Hue change per loop, used to rotate through different firework colors.
const HUE_STEP_INCREASE = 0.5;

// Minimum number of ticks per manual firework launch.
const TICKS_PER_FIREWORK_MIN = 5;

// Minimum number of ticks between each automatic firework launch.
const TICKS_PER_FIREWORK_AUTOMATED_MIN = 20;

// Maximum number of ticks between each automatic firework launch.
const TICKS_PER_FIREWORK_AUTOMATED_MAX = 80;