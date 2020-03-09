new Vue({
  el: "#app",

  data() {
    return {
      courses: [],
      title: "",
      time: undefined
    };
  },

  computed: {
    totalTime() {
      if (!this.courses.length) {
        return 0;
      }
      let totalTimeStudied = 0;
      this.courses.forEach(course => {
        totalTimeStudied += parseInt(course.time);
      });
      return totalTimeStudied;
      // return this.courses.reduce(
      //   (accumulator, currentValue) => accumulator + currentValue.time, 0
      // );
    }
  },

  methods: {
    addCourse() {
      const newCourse = { title: this.title, time: this.time };
      this.courses.push(newCourse);
      this.title = "";
      this.time = undefined;
    }
  }
});
