--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

-- Started on 2021-12-07 17:24:26 EST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4005 (class 1262 OID 16384)
-- Name: ts-project; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "ts-project" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE "ts-project" OWNER TO postgres;

\connect -reuse-previous=on "dbname='ts-project'"

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16385)
-- Name: apilogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apilogs (
    api_key text,
    date date DEFAULT now(),
    auth_level bigint DEFAULT 0 NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    num_calls bigint DEFAULT 0,
    name text DEFAULT ''::text,
    key_id integer NOT NULL
);


ALTER TABLE public.apilogs OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16400)
-- Name: apilogs_Keyid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."apilogs_Keyid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."apilogs_Keyid_seq" OWNER TO postgres;

--
-- TOC entry 4006 (class 0 OID 0)
-- Dependencies: 201
-- Name: apilogs_Keyid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."apilogs_Keyid_seq" OWNED BY public.apilogs.key_id;


--
-- TOC entry 3864 (class 2604 OID 16402)
-- Name: apilogs key_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apilogs ALTER COLUMN key_id SET DEFAULT nextval('public."apilogs_Keyid_seq"'::regclass);


--
-- TOC entry 3998 (class 0 OID 16385)
-- Dependencies: 200
-- Data for Name: apilogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.apilogs (api_key, date, auth_level, paid, num_calls, name, key_id) VALUES ('4613ea21-5b29-42a4-a336-98aaecf53856', '2021-11-29', 9, true, 0, 'admin', 55);


--
-- TOC entry 4007 (class 0 OID 0)
-- Dependencies: 201
-- Name: apilogs_Keyid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."apilogs_Keyid_seq"', 82, true);


-- Completed on 2021-12-07 17:24:27 EST

--
-- PostgreSQL database dump complete
--

--
-- TOC entry 203 (class 1259 OID 16413)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    project_id integer NOT NULL,
    project_name text,
    project_link text DEFAULT ''::text,
    project_github text DEFAULT ''::text,
    project_author text,
    project_submitter text,
    project_date_entry date DEFAULT now(),
    projects_description text
);

ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16411)
-- Name: projects_ProjectID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."projects_ProjectID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."projects_ProjectID_seq" OWNER TO postgres;

--
-- TOC entry 4006 (class 0 OID 0)
-- Dependencies: 202
-- Name: projects_ProjectID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."projects_ProjectID_seq" OWNED BY public.projects.project_id;


--
-- TOC entry 3862 (class 2604 OID 16416)
-- Name: projects project_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public."projects_ProjectID_seq"'::regclass);


--
-- TOC entry 3999 (class 0 OID 16413)
-- Dependencies: 203
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projects (project_id, project_name, project_link, project_github, project_author, project_submitter, project_date_entry, projects_description) VALUES (2, 'Portfolio v2', 'https://www.andrewhuynh.ca', 'https://www.github.com/v2', 'Andrew Huynh', 'b40041439b00380b0a80fb2128452349a592d88e0d59dd24c18f48069a72f88d', '2021-11-26', 'This is a test project');

--
-- TOC entry 4007 (class 0 OID 0)
-- Dependencies: 202
-- Name: projects_ProjectID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."projects_ProjectID_seq"', 22, true);


--
-- TOC entry 3867 (class 2606 OID 16424)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);


-- Completed on 2021-12-07 17:23:21 EST

--
-- PostgreSQL database dump complete
--

