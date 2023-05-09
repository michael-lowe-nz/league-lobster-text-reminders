import { Stack, StackProps } from "aws-cdk-lib";
import {
  Role,
  WebIdentityPrincipal,
  PolicyDocument,
  Effect,
  PolicyStatement,
  OpenIdConnectProvider,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class OIDCSetup extends Stack {
  // public readonly deployRole: Role;
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const githubProvider = new OpenIdConnectProvider(
      this,
      "GithubOIDCProvider",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"],
      }
    );

    const deployRole = new Role(this, "GithubDeployRole", {
      assumedBy: new WebIdentityPrincipal(
        githubProvider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
            // "token.actions.githubusercontent.com:sub":
            //   "repo:michael-lowe-nz/league-lobster-text-reminders:ref:refs/heads/main",
          },
          StringLike: {
            "token.actions.githubusercontent.com:sub":
              "repo:michael-lowe-nz/league-lobster-text-reminders:*",
          },
        }
      ),
      description: "Role to be used by Github actions",
      inlinePolicies: {
        CdkDeploymentPolicy: new PolicyDocument({
          assignSids: true,
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ["sts:AssumeRole"],
              resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
            }),
          ],
        }),
      },
    });
    this.exportValue(deployRole.roleArn);
  }
}
