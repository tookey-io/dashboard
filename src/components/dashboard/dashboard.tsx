import useAuth from "@/services/auth/use-auth";
import useDiscordAuth from "@/services/social-auth/discord/use-discord-auth";
import useTwitterAuth from "@/services/social-auth/twitter/use-twitter-auth";
import AccessTimeTwoTone from "@mui/icons-material/AccessTimeTwoTone";
import CheckIcon from "@mui/icons-material/Check";
import DiamondTwoToneIcon from "@mui/icons-material/DiamondTwoTone";
import KeyboardDoubleArrowUpTwoTone from "@mui/icons-material/KeyboardDoubleArrowUpTwoTone";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { styled, useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Spacer } from "../spacer";
import { StepIconProps } from "@mui/material/StepIcon";

export type DashboardProps = {};

const multipliers = [
  {
    name: "connect",
    value: 3,
    heading: "Connect Socials",
    text: "Connect your social accounts to hunt with x3 effort",
  },
  {
    name: "join us",
    value: 5,
    heading: "Join us",
    text: "Participate community to increase your share even more",
  },
  {
    name: "share",
    value: 10,
    heading: "Tell more",
    text: "Write and like tweets and discord threads to outplay others",
  },
  {
    name: "use",
    value: 20,
    heading: "Use it",
    text: "Apply all our and partners automation templates to unleash maximum power",
  },
];

const MultiplierConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: theme.spacing(22),
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#8adf00 0%, #abfb20 80%, #f50dba 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#8adf00 0%, #abfb20 50%, #abfb20 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const MultiplierStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #ff30d8 0%, #f50dba 50%, #f50dba 100%)",
  }),
  ...(ownerState.completed && {
    color: "#000",
    backgroundImage:
      "linear-gradient( 136deg, #8adf00 0%, #abfb20 50%, #abfb20 100%)",
  }),
}));

const MultiplierStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons = multipliers.map(({ value }, index) => (
    <Typography variant="h6" component="span" key={index}>
      x{value}
    </Typography>
  ));

  return (
    <MultiplierStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[Number(props.icon) - 1]}
    </MultiplierStepIconRoot>
  );
};

function TaskCard(props: {
  tokenReward?: number;
  multiplier?: number;
  title: string;
  description: string;
  action: string;
  onClick: () => void;

  actionButtonProps?: React.ComponentProps<typeof Button>;
  cardProps?: Omit<
    React.ComponentProps<typeof Stack>,
    "direction" | "spacing" | "alignItems"
  >;
}) {
  const theme = useTheme()
  return (
    <Stack
      flexGrow={1}
      flexBasis={0}
      display="flex"
      direction="column"
      spacing={2}
      alignItems="start"
      {...props.cardProps}
      sx={{
        border: 1,
        borderStyle: "solid",
        borderColor: grey[300],
        p: theme.spacing(3),
        ...props.cardProps?.sx,
      }}
    >
      <Stack direction="row" spacing={1}>
        {props.tokenReward && (
          <Chip
            label={`${props.tokenReward} $TOO`}
            icon={<DiamondTwoToneIcon />}
            color="secondary"
            variant="outlined"
            size="small"
            sx={{
              mb: theme.spacing(2),
              userSelect: "none",
            }}
          />
        )}
        {props.multiplier && (
          <Chip
            label={`${props.multiplier} Hunt Rate`}
            icon={<KeyboardDoubleArrowUpTwoTone />}
            variant="outlined"
            size="small"
            sx={{
              mb: theme.spacing(2),
              userSelect: "none",
            }}
          />
        )}
      </Stack>
      <Typography variant="h5">{props.title}</Typography>
      <Typography variant="body1">{props.description}</Typography>
      <Spacer />
      <Button
        variant="contained"
        onClick={props.onClick}
        {...props.actionButtonProps}
      >
        {props.action}
      </Button>
    </Stack>
  );
}

export const Dashboard = (
  props: React.ComponentProps<typeof Stack> & DashboardProps
) => {
  const theme = useTheme();
  const discordAuthService = useDiscordAuth();
  const twitterAuthService = useTwitterAuth();
  const { user, isLoaded } = useAuth();
  const availableTasks: Array<
    React.ComponentProps<typeof TaskCard> & { key: string }
  > | null = useMemo(() => {
    if (!isLoaded) return null;

    return [
      {
        key: "connect-twitter",
        tokenReward: 2,
        multiplier: 0.1,
        title: user?.twitter
          ? `Hi, @${user.twitter.username}`
          : "Connect Twitter",
        description: user?.twitter
          ? "You have already connected your Twitter account."
          : "Connect your Twitter account to earn 2 $TOO and unlock all telegram tasks to earn more.",
        action: Boolean(user?.twitter) ? "Connected" : "Connect",
        actionButtonProps: {
          disabled: Boolean(user?.twitter),
          startIcon: Boolean(user?.twitter) ? <CheckIcon /> : undefined,
        },
        onClick: () => {
          twitterAuthService.login(true);
        },
      },
      {
        key: "connect-github",
        tokenReward: 2,
        multiplier: 0.1,
        title: "Connect Github",
        description:
          "Connect your Github account to earn 2 $TOO and unlock all github tasks to earn more.",

        action: "Comming soon", //Boolean(user?.github) ? "Connected" : "Connect",
        actionButtonProps: {
          disabled: true, // Boolean(user?.github),
          startIcon: <AccessTimeTwoTone />, // Boolean(user?.github) ? <CheckIcon /> : undefined,
        },
        onClick: () => {},
      },
      {
        key: "connect-discord",
        tokenReward: 2,
        multiplier: 0.1,
        title: user?.discord
          ? `Hi, ${user.discord.discordTag}`
          : "Connect Discord",
        description: user?.discord
          ? "You have already connected your Discord account."
          : "Connect your Discord account to earn 2 $TOO and unlock all discord tasks to earn more.",
        action: Boolean(user?.discord) ? "Connected" : "Connect",
        actionButtonProps: {
          disabled: Boolean(user?.discord),
          startIcon: Boolean(user?.discord) ? <CheckIcon /> : undefined,
        },
        onClick: () => {
          discordAuthService.login(true);
        },
      },
    ];
  }, [user, isLoaded, discordAuthService, twitterAuthService]);
  return (
    <Stack {...props} spacing={4} sx={{ pt: theme.spacing(4) }}>
      <Typography variant="h2">Current Tasks</Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {availableTasks?.map((task) => (
          <TaskCard {...task} key={task.key} />
        ))}
      </Stack>

      <Typography variant="h4">Supply hunting</Typography>

      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={0}
          alternativeLabel
          connector={<MultiplierConnector />}
        >
          {multipliers.map((label) => (
            <Step key={label.name}>
              <StepLabel StepIconComponent={MultiplierStepIcon}>
                <Typography variant="h6">{label.heading}</Typography>
                <Typography variant="body2" maxWidth={160} sx={{ mx: "auto" }}>
                  {label.text}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stack>
  );
};
