<mat-card *ngIf="user && user.survey_complete == true" style="padding: 80px">
  <mat-card-title>
    Thanks for completing the questionnaire <br /><br />
    You're all set on this page
  </mat-card-title>
  <!-- <mat-icon style="font-size:44px;">thumb_up</mat-icon> -->
  <br />
  <!-- <h2 style="text-transform:uppercase;" *ngIf="user && user.step && user.step !==''">Next step: Please configure your
    {{user.step}}</h2> -->
</mat-card>

<div *ngIf="!submitted" class="surveyActual">
  <div class="centerheader">
    <h1>Welcome!</h1>
  </div>
  <div class="info">
    <div class="consentContent">
      <div *ngIf="
          !this.user ||
            passed_query_param_role == 'seed' ||
            (this.user && this.user.subrole !== 'friend');
          else showSeed
        ">
        <div class="welcome">
          <p>
            How do you balance the risks and rewards of getting vaccinated? How
            do you know what’s safe? What’s effective? Our social networks often
            influence our opinions about such questions.
          </p>

          <p>
            Therefore, this study does not focus on individuals, but on groups
            of friends. We will ask you to invite two of your friends to the
            study. All of you will answer questions like those above, and get
            paid for your participation.
          </p>
          <p>
            Understanding how we form our opinions is important for finding
            better ways to keep Americans safe. For this reason, your
            participation in this study is immensely important. In addition, you
            will be compensated via PayPal with up to $26 for your valuable
            time.
          </p>

          <p>
            Please scroll down to read the consent form and continue to the
            registration.
          </p>
        </div>

        <div class="consentactual">
          <h2>Consent form</h2>
          <p>
            <b> Purpose of the study:</b> This study investigates people’s
            beliefs about different issues, including vaccination.
            <b>This study is for groups of friends.</b> To participate in the
            study, <b>you and two of your friends</b> will need to sign up on
            this website. The friends will have to be adults from different
            households and live in the U.S. Please fill out the initial survey
            below to see if you qualify.
          </p>
          <p>
            A few days later after you and your two friends have signed up, you will be invited to participate in a 
            main survey that will take around 10 minutes. You will be asked questions such as "Do you think flu 
            vaccines are ineffective or effective for preventing flu?" and "Do you live in the U.S. and are at least 
            18 years old?". You will also have the opportunity to participate and get paid for taking part in similar 
            surveys in the future.
          </p>
          <p>
            <b>Payment:</b> You will receive $1 for completing the initial
            survey, $5 for the first friend who signs up, $10 for the second,
            and $10 for completing the main survey. You will receive $26 dollars
            in total for completing ALL parts of the study. Each of your friends
            will receive $1 for completing the initial survey, and $10 for
            completing the main survey. For us to be able to pay you, <b>you must
              have or sign up for a PayPal account.</b>
          </p>

          <p>
            <b>Benefits and Risks:</b> This project will generate useful and
            interesting findings on how people make up their minds and influence
            each other. There are no known risks in this research, but some
            individuals may experience discomfort or perceive loss of privacy
            when answering questions.
          </p>

          <p>
            <b>Your privacy:</b>MySurveys collects your data so we can select
            and contact participants for studies and analyze the anonymized
            results. There are no names or identifying information associated
            with your responses. Data will be kept securely and not shared with
            anyone else. Your personal information will only be used for
            compensation and will not be connected to your answers. This website
            also uses cookies to ensure you get the best experience. You can
            find out more about our privacy policy by clicking
            <a target="_BLANK" href="/privacy">here</a>. By continuing to use
            this website, you acknowledge that you understand and agree to our
            full privacy terms.
          </p>
          <p>
            <b>Right to withdraw from the study:</b> Your participation in this
            study is completely voluntary. You have the right to choose not to
            participate or to withdraw your participation at any point in this
            study without penalty.
          </p>
          <p>
            <b>Contact information:</b> This study is conducted by Mirta Galesic
            and Henrik Olsson from the Santa Fe Institute, funded by the NSF. If
            you have any questions, concerns, or complaints about the research,
            please feel free to email at mysurveysteam@gmail.com. If you have
            questions regarding your rights as a research participant, or about
            what you should do in case of any harm to you, or if you want to
            obtain information or offer input, please contact the UNM Office of
            the IRB (OIRB) at (505) 277-2644 or irb@unm.edu.
          </p>
        </div>
      </div>
      <ng-template #showSeed>
        <div class="welcome">
          <p>
            How do you balance the risks and rewards of getting vaccinated? How
            do you know what’s safe? What’s effective? Our social networks often
            influence our opinions about such questions.
          </p>
          <p>
            Therefore, this study does not focus on individuals, but on groups
            of friends. You and the friend that invited you will answer
            questions like those above, and get paid for your participation.
          </p>
          <p>
            Understanding how we form our opinions is important for finding
            better ways to keep Americans safe. For this reason, your
            participation in this study is immensely important. In addition, you
            will be compensated via PayPal with up to $11 for your valuable
            time.
          </p>
          <p>
            Please scroll down to read the consent form and continue to the
            registration.
          </p>
        </div>

        <div class="consentactual">
          <h2>Consent form</h2>
          <p>
            <b> Purpose of the study:</b> This study investigates people’s
            beliefs about different issues, including vaccination.
            <b>This study is for groups of friends.</b> To participate in the
            study, <b>you and your friend who invited</b> you will need to sign
            up on this website. To participate in the study you will have to be
            adults from different households and live in the U.S. Please fill
            out the questionnaire below to see if you qualify.
          </p>

          <p>
            A few days later after you and your friend have signed up you will be invited to participate in a study 
            taking no more than 10 minutes. you will be asked questions such as "Do you think flu vaccines are 
            ineffective or effective for preventing flu?" and "Do you live in the U.S. and are at least 18 years 
            old?"
          </p>
          <!-- <p>
          A week or two after you have signed up, you may be invited to participate in a study taking no more than 10
          minutes. You will be asked questions such as “Is growing GM crops harmful or beneficial to the environment?”,
          “Are childhood vaccines natural or unnatural?”, and “Do you have children under 18 years of age at home?”.
        </p> -->
          <p>
            <b>Payment:</b> You will receive $1 for completing the initial
            survey, and $10 for completing the main survey. For us to be able to
            pay you, <b>you must have or sign up for a PayPal account.</b>
          </p>
          <p>
            <b>Benefits and Risks:</b> This project will generate useful and
            interesting findings on how people make up their minds and influence
            each other.There are no known risks in this research, but some
            individuals may experience discomfort or perceive loss of privacy
            when answering questions.
          </p>
          <p>
            <b>Your privacy:</b> MySurveys collects your data so we can select
            and contact participants for studies and analyze the anonymized
            results. There are no names or identifying information associated
            with your responses. Data will be kept securely and not shared with
            anyone else. Your personal information will only be used for
            compensation and will not be connected to your answers. This website
            also uses cookies to ensure you get the best experience. You can
            find out more about our privacy policy by clicking
            <a target="_BLANK" href="/privacy">here</a>. By continuing to use
            this website, you acknowledge that you understand and agree to our
            full privacy terms.
          </p>
          <p>
            <b>Right to withdraw from the study:</b> Your participation in this
            study is completely voluntary. You have the right to choose not to
            participate or to withdraw your participation at any point in this
            study without penalty.
          </p>
          <p>
            <b>Contact information:</b> This study is conducted by Mirta Galesic
            and Henrik Olsson from the Santa Fe Institute, funded by the NSF. If
            you have any questions, concerns, or complaints about the research,
            please feel free to email at mysurveysteam@gmail.com. If you have
            questions regarding your rights as a research participant, or about
            what you should do in case of any harm to you, or if you want to
            obtain information or offer input, please contact the UNM Office of
            the IRB (OIRB) at (505) 277-2644 or irb@unm.edu.
          </p>
        </div>
      </ng-template>
      <mat-checkbox [(ngModel)]="accepted_short_consent">I consent</mat-checkbox>
    </div>
    <mat-card *ngIf="!accepted_short_consent">
      <h2>You must consent to proceed</h2>
    </mat-card>
    <div [@openClose]="accepted_short_consent ? 'open' : 'closed'" class="open-close-container">
      <form [hidden]="!accepted_short_consent" [formGroup]="qualificationForm" (ngSubmit)="onSubmit()">
        <h2>Thanks for agreeing to participate!</h2>
        <p>Please answer all of the following questions</p>
        <div class="shortConsent">
          <!-- <label id="example-radio-group-label">Do any children under the age of 18 currently live in your
            household?</label>
          <mat-radio-group aria-labelledby="example-radio-group-label" class="example-radio-group"
            formControlName="parents">
            <mat-radio-button class="example-radio-button" value="true">
              Yes
            </mat-radio-button>
            <mat-radio-button class="example-radio-button" value="0">
              No
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.parents == ''">
            This field is required
          </div>
           -->
        </div>
        <hr />
        <div>
          <label id="example-radio-group-label">Do you plan to get the flu vaccine during this flu season?
          </label>
          <mat-radio-group aria-labelledby="example-radio-group-label" class="example-radio-group"
            formControlName="vac_receive">
            <mat-radio-button *ngFor="let response of FluPossibleResponses" class="example-radio-button"
              value="{{ response.value }}">
              {{ response.value }} {{ response.name }}
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.vac_receive == ''">
            This field is required
          </div>
        </div>
        <hr />
        <div>
          <label id="example-radio-group-label">Overall, do you think the risks of flu vaccines outweigh the benefits or the benefits outweigh the 
            risks?
          </label>
          <mat-radio-group aria-labelledby="example-radio-group-label" class="example-radio-group"
            formControlName="vac_benefit">
            <mat-radio-button *ngFor="let response of Flu2PossibleResponses" class="example-radio-button"
              value="{{ response.value }}">
              {{ response.value }} {{ response.name }}
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.vac_benefit == ''">
            This field is required
          </div>
          <hr />
        </div>
        <div>
          <label id="example-radio-group-label">Do you think flu vaccines are ineffective or effective for preventing the flu?

          </label>
          <mat-radio-group aria-labelledby="example-radio-group-label" class="example-radio-group"
            formControlName="vac_effective">
            <mat-radio-button *ngFor="let response of Flu3PossibleResponses" class="example-radio-button"
              value="{{ response.value }}">
              {{ response.value }} {{ response.name }}
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.vac_effective == ''">
            This field is required
          </div>
          <hr />
        </div>
        <div>
          <label id="example-radio-group-label">Do you think flu vaccines can be very harmful for one's health or are not harmful at all?
          </label>
          <mat-radio-group aria-labelledby="example-radio-group-label" class="example-radio-group"
            formControlName="vac_harmful">
            <mat-radio-button *ngFor="let response of Flu4PossibleResponses" class="example-radio-button"
              value="{{ response.value }}">
              {{ response.value }} {{ response.name }}
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.vac_harmful == ''">
            This field is required
          </div>
          <hr />
        </div>
        <div>
          <label id="example-radio-group-label">
            Do you think big pharmaceutical companies benefit too much from flu vaccines at the expense 
of patients, or that both big pharmaceutical companies and patients benefit equally?
          </label>
          <mat-radio-group aria-labelledby="example-radio-group-label" class="example-radio-group"
            formControlName="vac_pharma">
            <mat-radio-button *ngFor="let response of Flu5PossibleResponses" class="example-radio-button"
              value="{{ response.value }}">
              {{ response.value }} {{ response.name }}
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.vac_pharma == ''">
            This field is required
          </div>
          <hr />
        </div>
        <div>
          <p>
            Would you be willing to share your answers to the questions above
            with your friends who might also participate in the study?
          </p>
          <mat-radio-group required aria-labelledby="example-radio-group-labelfriends" class="example-radio-group"
            formControlName="share">
            <mat-radio-button class="example-radio-button" value="true">
              Yes
            </mat-radio-button>
            <mat-radio-button class="example-radio-button" value="0">
              No
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.share == ''">
            This field is required
          </div>
          <hr />
        </div>
        <div>
          <p>
            Would you be willing to share information about flu vaccines from other sources (e.g., doctors, 
scientists) with your friends?
          </p>
          <mat-radio-group required aria-labelledby="example-radio-group-labelfriends" class="example-radio-group"
            formControlName="share_info">
            <mat-radio-button class="example-radio-button" value="true">
              Yes
            </mat-radio-button>
            <mat-radio-button class="example-radio-button" value="0">
              No
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.share_info == ''">
            This field is required
          </div>
          <hr />
        </div>
        <div>
          <p>Do you live in the U.S. and are at least 18 years old?</p>
          <!-- <label id="example-radio-group-labellocation">Do you live in the U.S.?
                    </label> -->
          <mat-radio-group aria-labelledby="example-radio-group-labelus" class="example-radio-group"
            formControlName="us">
            <mat-radio-button class="example-radio-button" value="true">
              Yes
            </mat-radio-button>
            <mat-radio-button class="example-radio-button" value="0">
              No
            </mat-radio-button>
          </mat-radio-group>
          <div class="fielderror" *ngIf="qualificationForm.value.us == ''">
            This field is required
          </div>
        </div>
        <hr />
        <div *ngIf="!qualificationForm.valid" class="fielderror">
          Please complete all questions above to submit the form.
        </div>
        <button mat-stroked-button [disabled]="!qualificationForm.valid" color="primary" type="submit">
          Submit
        </button>
        <br /><br /><br /><br />
      </form>
    </div>
  </div>
</div>
<mat-card *ngIf="!qualified && submitted" style="margin: 12px">
  <h2>
    Thank you for answering the questions. Unfortunately, you do not qualify for
    this study. Thank you for your interest.
  </h2>
</mat-card>
<div *ngIf="qualified && submitted && !user">
  <mat-card *ngIf="!hideQualificationMessage" style="text-align: center; margin: 12px 0" color="primary">
    <mat-icon style="color: green; font-size: 44px">check_circle_outline</mat-icon>
    <h2>
      Great - it looks like you're qualified to participate. Now, please create
      an account so we can invite you to studies by email and pay you through
      Paypal.
    </h2>
  </mat-card>

  <app-verification (notifyParent)="getNotification($event)" [qualificationForm]="qualificationForm"></app-verification>
</div>