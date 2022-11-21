export default class Projects {
  projectsData = null

  async fetchProjects() {
    const response = await fetch('/database/projects/projects.json')
    const projects = await response.json()
    this.projectsData = projects
  }

  getLatestProject() {
    return this.projectsData[this.projectsData.length - 1]
  }

  getFeaturedProject() {
    let project = []
    this.projectsData.forEach(data => {
      if (data.isFeatured) {
        project.push(data)
      }
    })

    return project
  }

  // Collects all of technologies used in projects 
  getTechnologyOptions() {
    const techs = []

    this.projectsData.forEach(data => {
      data.technologies.forEach(tech => {
        if (!techs.includes(tech)) {
          techs.push(tech)
        }
      })
    })

    return techs
  }

  getAllTechnologies() {
    return this.projectsData
  }

  isProjectIDExists(projectId) {
    const projectIDs = []
    this.projectsData.forEach(data => {
      if (!projectIDs.includes(data.id)) {
        projectIDs.push(data.id)
      }
    })

    return projectIDs.includes(projectId)
  }

  getProjectInformation(projectId) {
    let projectData = null
    this.projectsData.forEach(data => {
      if (data.id === projectId) {
        projectData = data
      }
    })

    return projectData
  }
}