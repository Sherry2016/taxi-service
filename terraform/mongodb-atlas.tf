provider "mongodbatlas" {
  public_key  = var.atlas_public_key
  private_key = var.atlas_private_key
}

resource "mongodbatlas_project" "project" {
  name   = "taxi-service-db"
  org_id = var.atlas_org_id
}

resource "mongodbatlas_project_ip_access_list" "acl" {
  project_id = mongodbatlas_project.project.id
  cidr_block = "0.0.0.0/0"
}

resource "mongodbatlas_cluster" "cluster" {
  project_id   = mongodbatlas_project.project.id
  name         = "db-cluster"
  cluster_type = "REPLICASET"
  replication_specs {
    num_shards = 1
    regions_config {
      region_name     = var.atlas_cluster_region
      electable_nodes = 3
      priority        = 7
      read_only_nodes = 0
    }
  }
  cloud_backup                 = true
  auto_scaling_disk_gb_enabled = true
  mongo_db_major_version       = "6.0"
  provider_name                = "GCP"
  provider_region_name         = var.atlas_cluster_region
  provider_instance_size_name  = var.atlas_cluster_tier
}

resource "mongodbatlas_database_user" "user" {
  project_id         = mongodbatlas_project.project.id
  auth_database_name = "admin"

  username = var.db_user
  password = var.db_password

  roles {
    role_name     = "readWrite"
    database_name = var.db_name
  }
}