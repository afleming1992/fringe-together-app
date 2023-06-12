/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Maybe<GroupMembership>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type GroupMembership = {
  __typename?: 'GroupMembership';
  admin?: Maybe<Scalars['Boolean']['output']>;
  group?: Maybe<Group>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroup?: Maybe<Group>;
  createUser?: Maybe<User>;
};


export type MutationCreateGroupArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  uid: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  group?: Maybe<Group>;
  groups?: Maybe<Array<Maybe<Group>>>;
  me?: Maybe<User>;
};


export type QueryGroupArgs = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  profile_pic?: Maybe<Scalars['String']['output']>;
  uid: Scalars['ID']['output'];
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Maybe<GroupMembership>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type GroupMembership = {
  __typename?: 'GroupMembership';
  admin?: Maybe<Scalars['Boolean']['output']>;
  group?: Maybe<Group>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroup?: Maybe<Group>;
  createUser?: Maybe<User>;
};


export type MutationCreateGroupArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  uid: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  group?: Maybe<Group>;
  groups?: Maybe<Array<Maybe<Group>>>;
  me?: Maybe<User>;
};


export type QueryGroupArgs = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  profile_pic?: Maybe<Scalars['String']['output']>;
  uid: Scalars['ID']['output'];
};
