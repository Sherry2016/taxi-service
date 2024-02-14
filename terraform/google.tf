provider "google" {
  credentials = file(var.credentials_file_path)
  project     = var.google_project_id
  region      = var.google_cloud_region
}

resource "google_cloud_run_service" "default" {
  name     = var.project_name
  location = var.atlas_cluster_region

  template {
    spec {
      containers {
        image = var.docker_image_url
        env {
          name  = "NODE_ENV"
          value = "production"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.default.location
  project  = google_cloud_run_service.default.project
  service  = google_cloud_run_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}