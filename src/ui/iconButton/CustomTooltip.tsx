import  Tooltip  from '@mui/material/Tooltip';

interface CustomTooltipProps{
  title: string;
  children: JSX.Element;
  arrow: boolean;
}


export const CustomTooltip = (props: CustomTooltipProps) => (
   <Tooltip
      {...props}
      title={props.title}
      placement="bottom"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: '1.125rem',
            letterSpacing: "1px",
            padding: "10px",
            borderRadius: "5px"
          },
        },
      }}
   >
     {props.children}
   </Tooltip>
 );