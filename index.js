const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello dear");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("the course was not found");
  res.send(course);
});
app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.params);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newCourse = {
    id: courses.length,
    name: req.body.name,
  };

  courses.push(newCourse);
  res.send(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("the course was not found");

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("the course was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Listening port ${port}`));
