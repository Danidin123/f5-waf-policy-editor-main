import * as React from "react";

import { PolicyEditorPageEnum } from "../../../store/policy-editor/policy-editor.types";
import { GeneralSettingsPage } from "../pages/general-settings.page";
import { MethodsPage } from "../pages/methods.page";
import { UrlsPage } from "../pages/urls.page";
import { FileTypesPage } from "../pages/file-types.page";
import { HeadersPage } from "../pages/headers.page";
import { ParametersPage } from "../pages/parameters.page";
import { OpenApiPage } from "../pages/open-api.page";
import { EvasionsPage } from "../pages/blocking-settings/evasions.page";
import { HttpProtocolsPage } from "../pages/blocking-settings/http-protocols.page";
import { ServerTechnologiesPage } from "../pages/server-technologies.page";
import { SignatureSetsPage } from "../pages/signatures/signature-sets.page";
import { SignaturesPage } from "../pages/signatures/signatures.page";
import { ViolationsPage } from "../pages/blocking-settings/violations.page";
import { BotDefenseMitigationsBrowsersPage } from "../pages/bot-defense/bot-defense.mitigations.browsers.page";
import { BotDefenseSettingsPage } from "../pages/bot-defense/bot-defense.settings.page";
import { BotDefenseMitigationsAnomaliesPage } from "../pages/bot-defense/bot-defense.mitigations.anomalies.page";
import { BotDefenseMitigationsClassesPage } from "../pages/bot-defense/bot-defense.mitigations.classes.page";
import { BotDefenseMitigationsSignaturesPage } from "../pages/bot-defense/bot-defense.mitigations.signatures.page";
import { CustomXffHeadersPage } from "../pages/custom-xff-headers.page";
import { AllowedResponseCodesPage } from "../pages/allowed-response-codes.page";
import { WhitelistIpsPage } from "../pages/whitelist-ips.page";
import { HostnamesPage } from "../pages/host-names.page";
import { DataGuardEnforcementUrlsPage } from "../pages/data-guard/data-guard.enforcement-urls.page";
import { DataGuardSettingsPage } from "../pages/data-guard/data-guard.settings.page";
import { CsrfProtectionPage } from "../pages/csrf-protection.page";
import { CsrfUrlsPage } from "../pages/csrf-urls.page";
import { CookieSettingsPage } from "../pages/cookie-settings.page";
import { CookiesPage } from "../pages/cookies.page";
import { CombinedPageComponent } from "./combined-page.component";

export class PolicyEditorPageFactory {
  constructor(
    private pages: { [key: number]: JSX.Element } = {
      [PolicyEditorPageEnum.Summary]: <GeneralSettingsPage />,
      [PolicyEditorPageEnum.Violations]: <ViolationsPage />,
      [PolicyEditorPageEnum.Methods]: <MethodsPage />,
      [PolicyEditorPageEnum.URLs]: <UrlsPage />,
      [PolicyEditorPageEnum.Filetypes]: <FileTypesPage />,
      [PolicyEditorPageEnum.Headers]: <HeadersPage />,
      [PolicyEditorPageEnum.Parameters]: <ParametersPage />,
      [PolicyEditorPageEnum.OpenAPI]: <OpenApiPage />,
      [PolicyEditorPageEnum.Evasions]: <EvasionsPage />,
      [PolicyEditorPageEnum.HttpProtocols]: <HttpProtocolsPage />,
      [PolicyEditorPageEnum.ServerTechnologies]: <ServerTechnologiesPage />,
      [PolicyEditorPageEnum.SignaturesSets]: <SignatureSetsPage />,
      [PolicyEditorPageEnum.SignaturesPolicy]: <SignaturesPage />,
      [PolicyEditorPageEnum.BotDefense]: (
        <CombinedPageComponent
          pages={[
            PolicyEditorPageEnum.BotDefenseSettings,
            PolicyEditorPageEnum.BotDefenseMigrationsBrowsers,
            PolicyEditorPageEnum.BotDefenseMigrationsAnomalies,
            PolicyEditorPageEnum.BotDefenseMigrationsClasses,
            PolicyEditorPageEnum.BotDefenseMigrationsSignatures,
          ]}
        />
      ),
      [PolicyEditorPageEnum.BotDefenseSettings]: <BotDefenseSettingsPage />,
      [PolicyEditorPageEnum.BotDefenseMigrationsBrowsers]: (
        <BotDefenseMitigationsBrowsersPage />
      ),
      [PolicyEditorPageEnum.BotDefenseMigrationsAnomalies]: (
        <BotDefenseMitigationsAnomaliesPage />
      ),
      [PolicyEditorPageEnum.BotDefenseMigrationsClasses]: (
        <BotDefenseMitigationsClassesPage />
      ),
      [PolicyEditorPageEnum.BotDefenseMigrationsSignatures]: (
        <BotDefenseMitigationsSignaturesPage />
      ),
      [PolicyEditorPageEnum.CustomXffHeaders]: <CustomXffHeadersPage />,
      [PolicyEditorPageEnum.AllowedResponseCodes]: <AllowedResponseCodesPage />,
      [PolicyEditorPageEnum.WhitelistIp]: <WhitelistIpsPage />,
      [PolicyEditorPageEnum.Hostnames]: <HostnamesPage />,
      [PolicyEditorPageEnum.DataGuard]: (
        <CombinedPageComponent
          pages={[
            PolicyEditorPageEnum.DataGuardSettings,
            PolicyEditorPageEnum.DataGuardEnforcementUrls,
          ]}
        />
      ),
      [PolicyEditorPageEnum.DataGuardEnforcementUrls]: (
        <DataGuardEnforcementUrlsPage />
      ),
      [PolicyEditorPageEnum.DataGuardSettings]: <DataGuardSettingsPage />,
      [PolicyEditorPageEnum.Csrf]: (
        <CombinedPageComponent
          pages={[
            PolicyEditorPageEnum.CsrfProtection,
            PolicyEditorPageEnum.CsrfUrls,
          ]}
        />
      ),
      [PolicyEditorPageEnum.CsrfProtection]: <CsrfProtectionPage />,
      [PolicyEditorPageEnum.CsrfUrls]: <CsrfUrlsPage />,
      [PolicyEditorPageEnum.EnforceCookieSettings]: (
        <CombinedPageComponent
          pages={[
            PolicyEditorPageEnum.CookieSettings,
            PolicyEditorPageEnum.Cookies,
          ]}
        />
      ),
      [PolicyEditorPageEnum.CookieSettings]: <CookieSettingsPage />,
      [PolicyEditorPageEnum.Cookies]: <CookiesPage />,
    }
  ) {}

  createPage(page: PolicyEditorPageEnum): JSX.Element {
    return this.pages[page];
  }
}
