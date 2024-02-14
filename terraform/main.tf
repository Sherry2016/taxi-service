terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      version = "~> 5.16"
      source  = "hashicorp/google"
    }

    mongodbatlas = {
      version = "~> 1.15.0"
      source  = "mongodb/mongodbatlas"
    }
  }
}

