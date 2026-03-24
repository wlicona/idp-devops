create table users (
	id UUID primary key,
	email varchar(150) unique not null,
	name varchar(120),
	password_hash TEXT,
	created_at timestamp default now()
);

create table organizations (
	id UUID primary key,
	name varchar(120) NOT NULL,
	created_at timestamp default now()
);

create table organization_members (
	id UUID primary key,
	user_id UUID REFERENCES users(id),
	organization_id UUID REFERENCES organizations(id),
	role varchar(50)
);

create table projects (
	id UUID primary key,
	name varchar(150) not null,
	organization_id UUID REFERENCES organizations(id),
	created_at timestamp default now()
);

create table git_providers (
	id UUID primary key,
	name varchar(50),
	api_url TEXT
);

CREATE TABLE repositories (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    project_id UUID REFERENCES projects(id),
    git_provider_id UUID REFERENCES git_providers(id),
    repo_url TEXT,
    default_branch VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pipelines (
    id UUID PRIMARY KEY,
    repository_id UUID REFERENCES repositories(id),
    name VARCHAR(150),
    pipeline_type VARCHAR(50),
    config JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pipeline_runs (
    id UUID PRIMARY KEY,
    pipeline_id UUID REFERENCES pipelines(id),
    status VARCHAR(50),
    started_at TIMESTAMP,
    finished_at TIMESTAMP,
    logs TEXT
);

