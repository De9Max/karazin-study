
# Karazin Study

---
Karazin Study is a web application designed for remote education. This project utilizes React for the frontend and FastAPI for the backend, with additional support from MySQL for the database. The project is fully containerized using Docker, making it easy to set up and run.

---
## Features

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Material-UI](https://mui.com/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)

- **Backend**:
  - [FastAPI](https://fastapi.tiangolo.com/)
  - [SQLAlchemy](https://www.sqlalchemy.org/)
  - [Pydantic](https://pydantic-docs.helpmanual.io/)
  - [MySQL](https://www.mysql.com/)
- **Containerization**:
  - [Docker](https://www.docker.com/get-started)
  - [Docker Compose](https://docs.docker.com/compose/install/)
---
## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/De9Max/karazin-study.git
   cd karazin-study
   ```

2. Run the application using Docker Compose:

   ```sh
   docker-compose up
   ```

### Frontend

The frontend is built with React and uses Material-UI for styling and Redux Toolkit Query for state management and data fetching.

### Backend

The backend is built with FastAPI and uses SQLAlchemy for ORM and Pydantic for data validation. The backend connects to a MySQL database.

### Database

The project uses MySQL as the database. The database service is defined in the `docker-compose.yml` file.

### Docker

The application is fully containerized using Docker. The `docker-compose.yml` file defines all the services (frontend, backend, and database) required to run the application.

---
## License

This project is licensed under the MIT License.

---