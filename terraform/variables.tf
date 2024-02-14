variable "project_name" {
  type    = string
  default = "taxi-service"
}

###-----------------------------------------------------------------------------
### region config
###-----------------------------------------------------------------------------

variable "google_cloud_region" {
  type        = string
  description = "the Google Cloud region in which to create resources"
  default     = "europe-west1"
}

variable "atlas_cluster_region" {
  type        = string
  description = "the Atlas region in which to create the database cluster"
  default     = "WESTERN_EUROPE"
}

###-----------------------------------------------------------------------------
### Google Cloud
###-----------------------------------------------------------------------------
variable "credentials_file_path" {
  type        = string
  description = "Path to the JSON file storing your google account credentials"
  default     = "../.google-account-credentials.json"
}

variable "google_project_id" {
  type        = string
  description = "the ID of your Google Cloud project"
  default     = "google-project-id"
}

variable "docker_image_url" {
  type        = string
  description = "the URL of your container image in a selected container registry"
  default     = "gcr.io/cloudrun/hello:latest"
}

###-----------------------------------------------------------------------------
### MongoDB Atlas
###-----------------------------------------------------------------------------

variable "atlas_cluster_tier" {
  type        = string
  description = "The tier of cluster you want to create."
  default     = "M10"
}

variable "atlas_org_id" {
  type        = string
  description = "The ID of the organization you want to create the project within."
  default     = "atlas-org-id"
}

variable "atlas_public_key" {
  type        = string
  description = "public key for MongoDB Atlas"
  default     = "atlas-public-key"
}

variable "atlas_private_key" {
  type        = string
  description = "private key for MongoDB Atlas"
  default     = "atlas-private-key"
}

###-----------------------------------------------------------------------------
### MongoDB database
###-----------------------------------------------------------------------------

variable "db_name" {
  type        = string
  description = "the name of the database to configure"
  default     = "taxi_service"
}

variable "db_user" {
  type        = string
  description = "the username used to connect to the mongodb cluster"
  default     = "user"
}
variable "db_password" {
  type        = string
  description = "the password used to connect to the mongodb cluster"
  default     = "db_password"
}